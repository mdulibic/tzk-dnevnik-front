import {useState} from "react";
import {AddResults} from "@/components/features/teacher/students/AddResults.tsx";
import {Statistics} from "@/components/features/teacher/students/Statistics.tsx";
import {Results} from "@/components/features/teacher/students/results/Results.tsx";
import SchoolClassSelect from "@/components/shared/select/SchoolClassSelect.tsx";
import {StudentList} from "@/components/features/teacher/students/StudentList.tsx";
import {getUserSchool} from "@/utils.ts";

export default function Students() {
    const [activeLink, setActiveLink] = useState('Popis učenika');
    const [classId, setClassId] = useState<string>("1");

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const renderContent = () => {
        switch (activeLink) {
            case 'Popis učenika':
                return <StudentList classId={classId}/>;
            case 'Unos rezultata':
                return <AddResults classId={classId}/>;
            case 'Rezultati':
                return <Results classId={classId}/>;
            case 'Statistika':
                return <Statistics classId={classId}/>;
        }
    };

    return (
        <main className="flex flex-1 flex-col p-4 md:gap-8 md:p-10">
            <div className="flex justify-between gap-2 mx-auto w-full max-w-6xl">
                <h1 className="text-3xl font-semibold">Razredi</h1>
                <div className="space-y-2">
                    <SchoolClassSelect
                        schoolId={String(getUserSchool()?.id)}
                        selectedClass={classId.toString()}
                        onChange={setClassId}
                    />
                </div>
            </div>
            <div
                className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-md text-muted-foreground mt-16">
                    <a
                        className={`${activeLink === 'Popis učenika' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Popis učenika')}
                    >
                        Popis učenika
                    </a>
                    <a
                        className={`${activeLink === 'Rezultati' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Rezultati')}
                    >
                        Rezultati
                    </a>
                    <a
                        className={`${activeLink === 'Unos rezultata' ? 'text-primary font-semibold cursor-pointer' : 'text-muted-foreground cursor-pointer'}`}
                        onClick={() => handleLinkClick('Unos rezultata')}
                    >
                        Unos rezultata
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