import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import ActivitySelect from "@/components/features/teacher/schedule/select/activity/ActivitySelect.tsx";
import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {toast} from "@/components/ui/use-toast.ts";

const handleAddActivity = async (name: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/activities/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader(),
            },
            body: name
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        toast({
            title: "Dodavanje aktivnosti uspješno!",
            description: "Nova aktivnost je dodana u nastavni kurikulum.",
        })
    } catch (error) {
        console.error('Error adding activity:', error);
        toast({
            duration: 2000,
            variant: "destructive",
            title: "Dodavanje akitvnosti neuspješno!",
            description: "Provjerite vezu i pokušajte ponovno.",
        })
    }
}

const handleAddSubActivity = async (name: string, activityId: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/activities/add/subactivity/${activityId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader(),
            },
            body: name
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        toast({
            title: "Dodavanje podaktivnosti uspješno!",
            description: "Nova podaktivnost je dodana u sustav.",
        })
    } catch (error) {
        console.error('Error adding subactivity:', error);
        toast({
            duration: 2000,
            variant: "destructive",
            title: "Dodavanje podakitvnosti neuspješno!",
            description: "Provjerite vezu i pokušajte ponovno.",
        })
    }
}

export default function Activities() {
    const [selectedActivity, setSelectedActivity] = useState<string>("1");
    const [activityName, setActivityName] = useState<string>("");
    const [subActivityName, setSubActivityName] = useState<string>("");

    const handleActivityChange = (id: string) => {
        setSelectedActivity(id);
    }

    return (
        <div className="space-y-4">
            <PageHeaderHeading>Nastavne aktivnosti</PageHeaderHeading>
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Dodaj aktivnost</CardTitle>
                    <CardDescription>
                        Dodaj novu nastavnu aktivnost u školski kurikulum.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder="Aktivnost"
                        onChange={(e) => {
                            setActivityName(e.target.value);
                        }}
                    />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button onClick={() => handleAddActivity(activityName)}>Spremi</Button>
                </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                    <CardTitle>Dodaj podaktivnost</CardTitle>
                    <CardDescription>
                        Dodaj novu podaktivnost za već postojeću nastavnu aktivnost.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Label>Odabir aktivnosti</Label>
                        <ActivitySelect
                            selectedActivity={selectedActivity}
                            onActivityChange={handleActivityChange}
                            onSubActivityChange={(id) => {
                            }}
                        ></ActivitySelect>
                        <Label className="text-xs text-muted-foreground">(Istražite dostupne podaktivnosti prije nego
                            što dodate nove.)</Label>
                        <Input
                            placeholder="Podaktivnost"
                            onChange={(e) => {
                                setSubActivityName(e.target.value);
                            }}
                        />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button onClick={() => handleAddSubActivity(subActivityName, selectedActivity)}>Spremi</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

