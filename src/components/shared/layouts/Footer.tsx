import {appConfig} from "@/config/app.ts";
import {ModeToggle} from "../theme/mode-toggle.tsx";

export function Footer() {
    return (
        <footer className="flex flex-col items-center justify-between min-h-[3rem] md:h-20 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-leftd">{appConfig.thesisName}</p>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">{appConfig.author.name}, Mentor: {appConfig.author.mentor}</p>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">{appConfig.author.faculty}</p>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">{appConfig.author.university}</p>
            <div className="hidden md:block">
                <ModeToggle/>
            </div>
        </footer>
    )
}