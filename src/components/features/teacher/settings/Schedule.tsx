import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import React, {ChangeEvent, useState} from "react";
import {toast} from "@/components/ui/use-toast.ts";
import {Label} from "@/components/ui/label.tsx";
import {CsvRow} from "@/pages/admin/import-users/ImportUsersDashboard.tsx";
import {getUserId} from "@/utils.ts";
import {importSchedule} from "@/api/schedule.tsx";

export default function Schedule() {
    const [file, setFile] = useState<File | null>(null);
    const [array, setArray] = useState<CsvRow[]>([]);

    const fileReader = new FileReader();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const csvFileToArray = (string: string) => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.map((i) => {
            const values = i.split(",");
            return csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {} as CsvRow);
        });

        setArray(array);
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                if (event.target?.result) {
                    const text = event.target.result.toString();
                    csvFileToArray(text);
                }
            };

            fileReader.readAsText(file);
        }
    };

    const headerKeys = Object.keys(Object.assign({}, ...array));

    const handleImport = async () => {
        if (!file) {
            toast({
                variant: "destructive",
                title: "Uvoz podataka neuspješan!",
                description: "Nije odabrana CSV datoteka.",
            });
            return;
        }

        try {
            const teacherId = getUserId();
            await importSchedule(file, teacherId);

            toast({
                title: "Uvoz podataka uspješan!",
                description: "Podaci dodani u sustav.",
            });
        } catch (error) {
            console.error('Error importing data:', error);

            toast({
                duration: 2000,
                variant: "destructive",
                title: "Uvoz podataka neuspješan!",
                description: "Provjerite podatke i pokušajte ponovno.",
            });
        }
    };


    return (
        <div className="space-y-4">
            <PageHeaderHeading>Raspored nastave</PageHeaderHeading>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Uvoz rasporeda nastave</CardTitle>
                    <CardDescription>Odaberite datoteku s podacima o nastavnim satovima koje želite dodati u
                        raspored.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="picture">Datoteka</Label>
                                <Input
                                    id="picture"
                                    onChange={handleOnChange}
                                    type="file"
                                    accept=".csv"
                                />
                            </div>
                        </div>
                        <form className="flex flex-col items-center mb-4" onSubmit={handleOnSubmit}>
                            <div className="flex w-full justify-between">
                                <div className="flex">
                                    <Button
                                        type="submit"
                                        className="py-2 px-4 bg-blue-600 text-white rounded shadow-md hover:bg-blue-500 focus:bg-blue-500"
                                    >
                                        Uvoz rasporeda
                                    </Button>
                                </div>
                                <Button
                                    onClick={handleImport}
                                    className="py-2 px-4 bg-black text-white rounded shadow-md hover:bg-gray-800 focus:bg-gray-800"
                                >
                                    Spremi podatke
                                </Button>
                            </div>
                        </form>

                        <table
                            className="min-w-full divide-y divide-gray-200 shadow-sm border border-gray-300 overflow-hidden">
                            <thead className="bg-white-600">
                            <tr>
                                {headerKeys.map((key) => (
                                    <th
                                        key={key}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {key}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {array.map((item, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                >
                                    {Object.values(item).map((val, index) => (
                                        <td
                                            key={index}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                        >
                                            {val}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
