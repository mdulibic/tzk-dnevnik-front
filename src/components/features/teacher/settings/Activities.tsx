import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import ActivitySelect from "@/components/shared/select/ActivitySelect.tsx";
import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {addActivity, addSubActivity} from "@/api/activity.tsx";

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
            <div className="space-y-4">
                <Card>
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
                        <Button disabled={activityName === ""} onClick={() => addActivity(activityName)}>Spremi</Button>
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
                            <Label className="text-xs text-muted-foreground">(Istražite dostupne podaktivnosti prije
                                nego
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
                        <Button disabled={subActivityName === ""}
                                onClick={() => addSubActivity(subActivityName, selectedActivity)}>Spremi</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

