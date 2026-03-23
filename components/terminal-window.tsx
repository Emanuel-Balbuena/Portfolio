"use client";

import { PROJECTS, Project } from "@/lib/projects";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

const BASE_COMMANDS = ["ls", "grep", "clear", "help", "cd", "mkdir", "pwd", "whoami", "date", "echo"];

type HistoryEntry = {
    id: number;
    command: string;
    cwd: string;
    type: "files" | "error" | "text" | "system";
    payload: any;
};

type FileSystemItem = {
    name: string;
    type: "dir" | "file" | "executable";
    desc?: string;
    projectData?: Project;
};

const BOOT_SEQUENCE = [
    "BIOS Date 10/24/25 09:22:37 Ver 09.00.06",
    "CPU: AMD Ryzen 9 7950X 16-Core Processor",
    "Memory Test: 65536K OK",
    "Enabling ACPI policies... [OK]",
    "Mounting Virtual File System (VFS)...",
    "Checking root file system... clean.",
    "Starting network interface wlan0... [OK]",
    "Loading projects.service... [OK]",
    "Initializing Guest Session...",
];

export function TerminalWindow() {
    const router = useRouter();

    // 1. --- ESTADOS ---
    const [cwd, setCwd] = useState<string>("~/projects");
    const [virtualDirs, setVirtualDirs] = useState<string[]>(["~", "~/projects"]);
    const [isBooting, setIsBooting] = useState(true);
    const [bootLines, setBootLines] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyPointer, setHistoryPointer] = useState<number>(-1);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // 2. --- FUNCIONES AUXILIARES Y LÓGICA CORE ---
    const getDirContents = (path: string): FileSystemItem[] => {
        const contents: FileSystemItem[] = [];

        virtualDirs.forEach(dir => {
            if (dir.startsWith(path) && dir !== path) {
                const relativePath = dir.substring(path.length + (path === "~" ? 1 : 1));
                if (!relativePath.includes("/")) {
                    contents.push({ name: relativePath, type: "dir", desc: "Directorio" });
                }
            }
        });

        if (path === "~/projects") {
            PROJECTS.forEach(p => {
                contents.push({ name: p.name, type: "executable", desc: p.desc, projectData: p });
            });
        }

        return contents;
    };

    const resolvePath = (target: string): string => {
        if (target === "~" || target === "/") return "~";
        if (target === "..") {
            if (cwd === "~") return "~";
            const parts = cwd.split("/");
            parts.pop();
            return parts.join("/") || "~";
        }
        return cwd === "~" ? `~/${target}` : `${cwd}/${target}`;
    };

    const executeCommand = (cmdString: string, forcedCwd?: string) => {
        const activeCwd = forcedCwd || cwd;
        const trimmedCmd = cmdString.trim();
        if (!trimmedCmd) return;

        setCommandHistory((prev) => [...prev, trimmedCmd]);
        setHistoryPointer(-1);

        const args = trimmedCmd.split(" ").filter(Boolean);
        const baseCmd = args[0].toLowerCase();

        let newEntry: HistoryEntry = {
            id: Date.now(),
            command: trimmedCmd,
            cwd: activeCwd,
            type: "error",
            payload: `zsh: command not found: ${baseCmd}`,
        };

        const currentContents = getDirContents(activeCwd);
        const projectMatch = currentContents.find(c => c.type === "executable" && c.name.toLowerCase() === baseCmd);

        if (projectMatch && projectMatch.projectData) {
            setIsRedirecting(true);
            newEntry.type = "system";
            newEntry.payload = `[OK] Ejecutando binario ./${projectMatch.name}\nRedirigiendo a interfaz gráfica (GUI)...`;
            setTimeout(() => router.push(`/projects/${projectMatch.projectData?.name}`), 600);
        } else if (baseCmd === "clear") {
            setHistory([]);
            return;
        } else if (baseCmd === "pwd") {
            newEntry.type = "text";
            newEntry.payload = activeCwd.replace("~", "/home/guest");
        } else if (baseCmd === "whoami") {
            newEntry.type = "text";
            newEntry.payload = "guest (permisos restringidos)\nrol: visitante_prospecto";
        } else if (baseCmd === "date") {
            newEntry.type = "text";
            newEntry.payload = new Date().toString();
        } else if (baseCmd === "echo") {
            newEntry.type = "text";
            newEntry.payload = args.slice(1).join(" ");
        } else if (baseCmd === "cd") {
            const target = args[1] || "~";
            const newPath = resolvePath(target);
            if (virtualDirs.includes(newPath) || newPath === "~") {
                setCwd(newPath);
                newEntry.type = "text";
                newEntry.payload = "";
            } else {
                newEntry.payload = `cd: no such file or directory: ${target}`;
            }
        } else if (baseCmd === "mkdir") {
            const target = args[1];
            if (!target) {
                newEntry.payload = "usage: mkdir [directory_name]";
            } else {
                const newPath = resolvePath(target);
                if (virtualDirs.includes(newPath)) {
                    newEntry.payload = `mkdir: cannot create directory ‘${target}’: File exists`;
                } else {
                    setVirtualDirs(prev => [...prev, newPath]);
                    newEntry.type = "text";
                    newEntry.payload = "";
                }
            }
        } else if (baseCmd === "help") {
            newEntry.type = "text";
            newEntry.payload = `Comandos disponibles:\n  cd [dir]   Cambiar de directorio\n  ls         Listar contenido\n  mkdir      Crear directorio\n  pwd        Ruta actual\n  clear      Limpiar terminal\n  whoami     Usuario actual\n  date       Fecha del sistema\n\nPara ejecutar un proyecto, navega a ~/projects y escribe su nombre.`;
        } else if (baseCmd === "ls") {
            newEntry.type = "files";
            newEntry.payload = getDirContents(activeCwd);
        }

        if (newEntry.payload !== "") {
            setHistory((prev) => [...prev, newEntry]);
        } else {
            setHistory((prev) => [...prev, { ...newEntry, type: "text" }]);
        }
    };

    // 3. --- EFECTOS SECUNDARIOS (useEffects) ---
    useEffect(() => {
        if (!isBooting) return;

        let timeouts: NodeJS.Timeout[] = [];
        const skipBoot = () => {
            timeouts.forEach(clearTimeout);
            setIsBooting(false);
            setTimeout(() => inputRef.current?.focus(), 50);
        };

        window.addEventListener("keydown", skipBoot);
        window.addEventListener("mousedown", skipBoot);

        let accumulatedTime = 0;
        BOOT_SEQUENCE.forEach((line, index) => {
            const delay = Math.random() * 200 + 50;
            accumulatedTime += delay;
            const timeout = setTimeout(() => {
                setBootLines(prev => [...prev, line]);
                if (index === BOOT_SEQUENCE.length - 1) setTimeout(skipBoot, 400);
            }, accumulatedTime);
            timeouts.push(timeout);
        });

        return () => {
            window.removeEventListener("keydown", skipBoot);
            window.removeEventListener("mousedown", skipBoot);
            timeouts.forEach(clearTimeout);
        };
    }, [isBooting]);

    useEffect(() => {
        inputRef.current?.focus();
        if (history.length === 0 && !isBooting) executeCommand("ls", "~/projects");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBooting]); // Modificado para que haga 'ls' justo al terminar el boot

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [history]);

    useEffect(() => {
        if (!inputValue || isRedirecting) {
            setSuggestion("");
            return;
        }

        const args = inputValue.split(" ");
        const isTypingCommand = args.length === 1;
        const currentContents = getDirContents(cwd);

        if (isTypingCommand) {
            const availableExes = currentContents.filter(c => c.type === "executable").map(c => c.name);
            const allPossibilities = [...BASE_COMMANDS, ...availableExes];
            const match = allPossibilities.find((c) => c.toLowerCase().startsWith(args[0].toLowerCase()));
            setSuggestion(match ? match + " " : "");
        } else if (args[0] === "cd" || args[0] === "mkdir") {
            const dirs = currentContents.filter(c => c.type === "dir").map(c => c.name);
            const match = dirs.find((d) => d.toLowerCase().startsWith(args[1].toLowerCase()));
            setSuggestion(match ? `${args[0]} ${match}` : "");
        } else {
            setSuggestion("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue, isRedirecting, cwd, virtualDirs]);

    // 4. --- MANEJADORES DE EVENTOS ---
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isRedirecting) {
            e.preventDefault();
            return;
        }

        if (e.key === "Enter") {
            executeCommand(inputValue);
            setInputValue("");
        }
        else if (e.key === "Tab") {
            e.preventDefault();
            if (suggestion && suggestion.toLowerCase().startsWith(inputValue.toLowerCase())) {
                setInputValue(suggestion);
            }
        }
        else if (e.key === "ArrowRight") {
            const cursorPosition = inputRef.current?.selectionStart;
            if (cursorPosition === inputValue.length && suggestion && suggestion.toLowerCase().startsWith(inputValue.toLowerCase())) {
                e.preventDefault();
                setInputValue(suggestion);
            }
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newPointer = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
                setHistoryPointer(newPointer);
                setInputValue(commandHistory[newPointer]);
            }
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyPointer !== -1) {
                const newPointer = historyPointer < commandHistory.length - 1 ? historyPointer + 1 : -1;
                setHistoryPointer(newPointer);
                setInputValue(newPointer === -1 ? "" : commandHistory[newPointer]);
            }
        }
    };

    // 5. --- RENDERIZADO ---
    if (isBooting) {
        return (
            // Añadimos soporte light mode: fondo blanco, texto oscuro, y mantenemos el oscuro para dark:
            <div className="w-full max-w-5xl h-[75vh] flex flex-col mx-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080808] shadow-2xl overflow-hidden font-mono text-base p-6">
                <div className="flex flex-col space-y-1">
                    {bootLines.map((line, i) => (
                        <div key={i} className="text-slate-600 dark:text-slate-300">{line}</div>
                    ))}
                    <div className="w-3 h-5 bg-slate-600 dark:bg-slate-300 animate-pulse mt-1"></div>
                </div>
                <div className="mt-auto text-xs text-slate-400 dark:text-slate-600 text-center animate-pulse">
                    Presiona cualquier tecla para saltar la secuencia...
                </div>
            </div>
        );
    }

    const renderOutput = (entry: HistoryEntry) => {
        if (entry.payload === "") return null;
        if (entry.type === "error") return <div className="text-red-500 dark:text-red-400 mt-1">{entry.payload}</div>;
        if (entry.type === "text") return <div className="text-slate-700 dark:text-slate-300 mt-1 whitespace-pre-wrap">{entry.payload}</div>;
        if (entry.type === "system") return <div className="text-emerald-600 dark:text-emerald-400 mt-1 whitespace-pre-wrap animate-pulse">{entry.payload}</div>;
        if (entry.type === "files") {
            const files = entry.payload as FileSystemItem[];
            if (files.length === 0) return null;

            return (
                <div className="flex flex-col space-y-1 mt-2">
                    {files.map((file) => (
                        <div
                            key={file.name}
                            onClick={() => {
                                if (file.type === "dir") {
                                    executeCommand(`cd ${file.name}`, entry.cwd);
                                } else if (file.type === "executable") {
                                    setInputValue(file.name);
                                    executeCommand(file.name, entry.cwd);
                                    setInputValue("");
                                }
                            }}
                            className="flex items-center gap-4 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-800/30 cursor-pointer group transition-colors w-fit pr-4 rounded"
                        >
                            {file.type === "dir" ? (
                                <>
                                    <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:underline underline-offset-4">{file.name}/</span>
                                    <span className="text-sm text-slate-500">- {file.desc}</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-emerald-600/0 dark:text-emerald-500/0 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors"> {">"} </span>
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline underline-offset-4">{file.name}</span>
                                    <span className="text-sm text-slate-500">- {file.desc}</span>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="w-full max-w-5xl h-[75vh] flex flex-col mx-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080808] shadow-2xl overflow-hidden font-mono text-base text-slate-600 dark:text-slate-400">
            {/* Window Chrome / Cabecera */}
            <div className="flex items-center px-4 py-3 bg-slate-50 dark:bg-[#0f0f0f] border-b border-slate-200 dark:border-slate-800/50">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700/50"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700/50"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700/50"></div>
                </div>
                <div className="mx-auto text-slate-500 text-sm">guest@portfolio: {cwd}</div>
            </div>

            {/* Scroll Area */}
            <div
                ref={scrollContainerRef}
                className="flex-1 p-6 overflow-y-auto flex flex-col [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-700"
                onClick={() => { if (!isRedirecting) inputRef.current?.focus() }}
            >
                <div className="mt-auto flex flex-col gap-6">
                    {history.map((entry) => (
                        <div key={entry.id} className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-emerald-600 dark:text-emerald-500 font-bold">guest@portfolio</span>
                                <span className="text-slate-500 dark:text-slate-400 font-bold">{entry.cwd} $</span>
                                <span className="text-slate-800 dark:text-slate-200">{entry.command}</span>
                            </div>
                            {renderOutput(entry)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Input Area */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-[#0a0a0a] flex items-center gap-2">
                <span className="text-emerald-600 dark:text-emerald-500 font-bold">guest@portfolio</span>
                <span className="text-slate-500 dark:text-slate-400 font-bold shrink-0">{cwd} $</span>

                <div className="relative flex-1 flex items-center">
                    {suggestion && suggestion.toLowerCase().startsWith(inputValue.toLowerCase()) && (
                        <span className="absolute left-0 pointer-events-none text-slate-400 dark:text-slate-700 whitespace-pre">
                            {suggestion}
                        </span>
                    )}

                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isRedirecting}
                        className="relative w-full bg-transparent outline-none border-none text-slate-900 dark:text-slate-200 font-mono caret-slate-900 dark:caret-slate-200 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder=""
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
            </div>
        </div>
    );
}