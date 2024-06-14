import {useState} from "react";
import {getCurrentSchoolYear} from "@/utils.ts";
import {StudentGeneral} from "@/components/features/student/profile/StudentGeneral.tsx";
import {StudentResults} from "@/components/features/student/profile/StudentResults.tsx";
import {StudentStatistics} from "@/components/features/student/profile/StudentStatistics.tsx";
import {Label} from "@/components/ui/label.tsx";
import {SchoolYearSelect} from "@/components/shared/select/SchoolYearSelect.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";

export default function StudentDetails() {
    const {state} = useLocation();
    const [activeLink, setActiveLink] = useState('Općenito');
    const [selectedYear, setSelectedYear] = useState(getCurrentSchoolYear);

    const navigate = useNavigate();

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const goBack = () => {
        navigate(-1)
    };

    const renderContent = () => {
        switch (activeLink) {
            case 'Općenito':
                return <StudentGeneral
                    studentId={state.studentId}
                />;
            case 'Rezultati':
                return <StudentResults
                    schoolYear={selectedYear}
                    studentId={state.studentId}
                />;
            case 'Statistika':
                return <StudentStatistics
                    schoolYear={selectedYear}
                    studentId={state.studentId}
                />;
        }
    };

    return (
        <main className="flex flex-1 flex-col p-4 md:gap-8 md:p-10">
            <div className="flex justify-between gap-2 mx-auto w-full max-w-6xl">
                <div className="space-x-4 flex items-center">
                    <ArrowBack onClick={goBack}></ArrowBack>
                    <h1 className="text-3xl font-semibold">Detalji o učeniku</h1>
                </div>
                <div className="space-y-2">
                    {activeLink !== 'Općenito' && (
                        <div>
                            <Label>Školska godina:</Label>
                            <SchoolYearSelect
                                userId={state.studentId}
                                selectedYear={selectedYear}
                                onChange={setSelectedYear}/>
                        </div>
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