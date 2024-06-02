import {useState} from 'react';
import General from "@/components/features/teacher/settings/General.tsx";
import Activities from "@/components/features/teacher/settings/Activities.tsx";
import Schedule from "@/components/features/teacher/settings/Schedule.tsx";

export default function Settings() {
    const [activeLink, setActiveLink] = useState('Općenito');

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    // Function to render content based on the active link
    const renderContent = () => {
        switch (activeLink) {
            case 'Općenito':
                return <General/>;
            case 'Nastavne aktivnosti':
                return <Activities/>;
            case 'Raspored nastave':
                return <Schedule/>;
        }
    };

    return (
        <main className="flex flex-1 flex-col p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Postavke</h1>
            </div>
            <div
                className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-md text-muted-foreground mt-16">
                    <a
                        className={`${activeLink === 'Općenito' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Općenito')}
                    >
                        Općenito
                    </a>
                    <a
                        className={`${activeLink === 'Nastavne aktivnosti' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Nastavne aktivnosti')}
                    >
                        Nastavne aktivnosti
                    </a>
                    <a
                        className={`${activeLink === 'Raspored nastave' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Raspored nastave')}
                    >
                        Raspored nastave
                    </a>
                </nav>
                <main className="grid gap-6">
                    {renderContent()}
                </main>
            </div>
        </main>
    );
}
