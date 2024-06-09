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

    // Function to render content based on the active link
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
                    studentId={getUserId()}
                />;
        }
    };

    return (
        <main className="flex flex-1 flex-col p-4 md:gap-8 md:p-10">
            <div className="flex justify-between gap-2 mx-auto w-full max-w-6xl">
                <h1 className="text-3xl font-semibold">Moj profi</h1>
                <div className="space-y-2">
                    <Label>Školska godina:</Label>
                    {activeLink !== 'Općenito' && (
                        <SchoolYearSelect
                            selectedYear={selectedYear}
                            onChange={setSelectedYear}/>
                    )}
                </div>
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
                <main className="grid gap-6">
                    {renderContent()}
                </main>
            </div>
        </main>
    );
}