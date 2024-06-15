import {useState} from 'react';
import Activities from "@/components/features/teacher/settings/Activities.tsx";
import { ImportUsersDashboard } from '@/components/features/admin/settings/ImportUsersDashboard';
import { ImportSchoolsDashboard } from '@/components/features/admin/settings/ImportSchoolsDashboard';

export default function AdminSettings() {
    const [activeLink, setActiveLink] = useState('Nastavne aktivnosti');

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const renderContent = () => {
        switch (activeLink) {
            case 'Nastavne aktivnosti':
                return <Activities/>;
            case 'Korisnici':
                return <ImportUsersDashboard/>;
            case 'Škole':
                return <ImportSchoolsDashboard/>;
        }
    };

    return (
        <main className="flex flex-col p-16">
            <div className="w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Postavke</h1>
            </div>
            <div
                className="grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-lg text-muted-foreground mt-16">
                    <a
                        className={`${activeLink === 'Nastavne aktivnosti' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Nastavne aktivnosti')}
                    >
                        Nastavne aktivnosti
                    </a>
                    <a
                        className={`${activeLink === 'Korisnici' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Korisnici')}
                    >
                       Korisnici
                    </a>
                    <a
                        className={`${activeLink === 'Škole' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Škole')}
                    >
                        Škole
                    </a>
                </nav>
                <main className="grid gap-6">
                    {renderContent()}
                </main>
            </div>
        </main>
    );
}

