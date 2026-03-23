"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

const projects = [
    { id: "prj-1", name: "powerlink-api", desc: "API Gateway construido en Go" },
    { id: "prj-2", name: "ui-system", desc: "Librería de componentes React" },
    { id: "prj-3", name: "generative-bg", desc: "Experimento WebGL" },
    { id: "prj-4", name: "terminal-portfolio", desc: "Interfaz basada en CLI" },
    { id: "prj-5", name: "neovim-config", desc: "Archivos de configuración Lua" },
];

const AVAILABLE_COMMANDS = ["ls", "grep", "clear", "help"];

type HistoryEntry = {
    id: number;
    command: string;
    type: "projects" | "error" | "text";
    payload: any;
};

export function TerminalWindow() {
    const [inputValue, setInputValue] = useState("");
    const [suggestion, setSuggestion] = useState(""); // NUEVO: Estado para el autocompletar
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyPointer, setHistoryPointer] = useState<number>(-1);

    const inputRef = useRef<HTMLInputElement>(null);

    // NUEVO: Ref para el contenedor con scroll (para evitar que baje toda la página)
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
        executeCommand("ls");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // NUEVO: Lógica de Auto-Scroll confinada al contenedor
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [history]);

    // NUEVO: Lógica predictiva (Ghost Autocomplete)
    useEffect(() => {
        if (!inputValue) {
            setSuggestion("");
            return;
        }

        const args = inputValue.split(" ");
        const isTypingCommand = args.length === 1;
        const isTypingArgument = args.length === 2 && args[0] === "grep";

        if (isTypingCommand) {
            const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(args[0].toLowerCase()));
            setSuggestion(match ? match + " " : "");
        } else if (isTypingArgument) {
            const match = projects.find((p) => p.name.startsWith(args[1].toLowerCase()));
            setSuggestion(match ? `grep ${match.name}` : "");
        } else {
            setSuggestion("");
        }
    }, [inputValue]);

    const executeCommand = (cmdString: string) => {
        const trimmedCmd = cmdString.trim();
        if (!trimmedCmd) return;

        setCommandHistory((prev) => [...prev, trimmedCmd]);
        setHistoryPointer(-1);

        const args = trimmedCmd.split(" ").filter(Boolean);
        const baseCmd = args[0].toLowerCase();

        let newEntry: HistoryEntry = {
            id: Date.now(),
            command: trimmedCmd,
            type: "error",
            payload: `zsh: command not found: ${baseCmd}`,
        };

        if (baseCmd === "clear") {
            setHistory([]);
            return;
        } else if (baseCmd === "help") {
            newEntry.type = "text";
            newEntry.payload = "Comandos: ls, grep [texto], clear, help";
        } else if (baseCmd === "ls") {
            newEntry.type = "projects";
            newEntry.payload = projects;
        } else if (baseCmd === "grep") {
            const searchTerm = args.slice(1).join(" ").toLowerCase();
            if (!searchTerm) {
                newEntry.type = "error";
                newEntry.payload = "uso: grep [texto]";
            } else {
                const filtered = projects.filter(
                    (p) =>
                        p.name.toLowerCase().includes(searchTerm) ||
                        p.desc.toLowerCase().includes(searchTerm)
                );
                newEntry.type = "projects";
                newEntry.payload = filtered;
            }
        }

        setHistory((prev) => [...prev, newEntry]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            executeCommand(inputValue);
            setInputValue("");
        }
        else if (e.key === "Tab") {
            e.preventDefault();
            // Si hay una sugerencia predictiva, la aplicamos al presionar Tab
            if (suggestion && suggestion.startsWith(inputValue.toLowerCase())) {
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

    const renderOutput = (entry: HistoryEntry) => {
        if (entry.type === "error") {
            return <div className="text-red-400 mt-1">{entry.payload}</div>;
        }
        if (entry.type === "text") {
            return <div className="text-slate-300 mt-1">{entry.payload}</div>;
        }
        if (entry.type === "projects") {
            const projList = entry.payload as typeof projects;
            if (projList.length === 0) return <div className="text-slate-500 mt-1">No se encontraron resultados.</div>;

            return (
                <div className="flex flex-col space-y-1 mt-2">
                    {projList.map((project) => (
                        <div key={project.id} className="flex items-center gap-4 py-0.5 hover:bg-slate-800/30 cursor-pointer group transition-colors">
                            <span className="text-emerald-500/0 group-hover:text-emerald-500 transition-colors"> {">"} </span>
                            <span className="font-semibold text-blue-400 group-hover:underline underline-offset-4">{project.name}</span>
                            <span className="text-sm text-slate-500">- {project.desc}</span>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="w-full max-w-5xl h-[75vh] flex flex-col mx-auto rounded-lg border border-slate-800 bg-[#080808] shadow-2xl overflow-hidden font-mono text-base text-slate-400">

            <div className="flex items-center px-4 py-3 bg-[#0f0f0f] border-b border-slate-800/50">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
                </div>
                <div className="mx-auto text-slate-500 text-sm">~ /projects</div>
            </div>

            {/* ÁREA DE SALIDA - SCROLLBAR CUSTOMIZADO */}
            <div
                ref={scrollContainerRef}
                className="flex-1 p-6 overflow-y-auto flex flex-col [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-700"
                onClick={() => inputRef.current?.focus()}
            >
                <div className="mt-auto flex flex-col gap-6">
                    {history.map((entry) => (
                        <div key={entry.id} className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-emerald-500 font-bold">guest@portfolio</span>
                                <span className="text-slate-400 font-bold">~/projects $</span>
                                <span className="text-slate-200">{entry.command}</span>
                            </div>
                            {renderOutput(entry)}
                        </div>
                    ))}
                </div>
            </div>

            {/* ÁREA DE ENTRADA CON GHOST AUTOCOMPLETE */}
            <div className="px-6 py-4 border-t border-slate-800/50 bg-[#0a0a0a] flex items-center gap-2">
                <span className="text-emerald-500 font-bold">guest@portfolio</span>
                <span className="text-slate-400 font-bold shrink-0">~/projects $</span>

                {/* Contenedor relativo para el input y la sugerencia */}
                <div className="relative flex-1 flex items-center">
                    {/* Texto predictivo de fondo */}
                    {suggestion && suggestion.toLowerCase().startsWith(inputValue.toLowerCase()) && (
                        <span className="absolute left-0 pointer-events-none text-slate-700 whitespace-pre">
                            {suggestion}
                        </span>
                    )}

                    {/* Input real (transparente pero con texto que cubre la sugerencia) */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="relative w-full bg-transparent outline-none border-none text-slate-200 font-mono caret-slate-200 z-10"
                        placeholder=""
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
            </div>
        </div>
    );
}