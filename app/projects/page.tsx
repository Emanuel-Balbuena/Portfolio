import { TerminalWindow } from "@/components/terminal-window";

export default function ProjectsPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center w-full bg-[#050505] p-4 sm:p-8">
            <TerminalWindow />
        </div>
    );
}