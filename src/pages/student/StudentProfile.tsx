import {useState} from "react";
import {StudentStatistics} from "@/components/features/student/profile/StudentStatistics.tsx";
import {StudentGeneral} from "@/components/features/student/profile/StudentGeneral";
import {getCurrentSchoolYear, getUserId} from "@/utils.ts";
import {StudentResults} from "@/components/features/student/profile/StudentResults.tsx";
import {SchoolYearSelect} from "@/components/shared/select/SchoolYearSelect.tsx";
import {Label} from "@/components/ui/label.tsx";

export default function StudentProfile() {
    const [activeLink, setActiveLink] = useState('Općenito');
    const [selectedYear, setSelectedYear] = useState(getCurrentSchoolYear);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const renderContent = () => {
        switch (activeLink) {
            case 'Općenito':
                return <StudentGeneral
                    studentId={getUserId()}
                />;
            case 'Rezultati':
                return <StudentResults
                    schoolYear={selectedYear}
                    studentId={getUserId()}
                />;
            case 'Statistika':
                return <StudentStatistics
                    schoolYear={selectedYear}
                    studentId={getUserId()}
                />;
        }
    };

    return (
        <main className="flex flex-col p-4 md:gap-8 md:p-10">
            <div className="flex justify-between gap-2">
                <h1 className="text-3xl font-semibold">Moj profil</h1>
                <div className="space-y-2">
                    {activeLink !== 'Općenito' && (
                        <div>
                            <Label>Školska godina:</Label>
                            <SchoolYearSelect
                                userId={getUserId()}
                                selectedYear={selectedYear}
                                onChange={setSelectedYear}/>
                        </div>
                    )}
                </div>
            </div>
            <div
                className="grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-lg text-muted-foreground mt-16">
                    <a
                        className={`${activeLink === 'Općenito' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Općenito')}
                    >
                        Općenito
                    </a>
                    <a
                        className={`${activeLink === 'Rezultati' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Rezultati')}
                    >
                        Rezultati
                    </a>
                    <a
                        className={`${activeLink === 'Statistika' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Statistika')}
                    >
                        Statistika
                    </a>
                </nav>
                <div className="flex-grow">
                    {renderContent()}
                </div>
            </div>
        </main>
    );
}