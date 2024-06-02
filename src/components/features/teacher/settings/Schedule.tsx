import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

export default function Schedule() {
    return (
        <div className="space-y-4">
            <PageHeaderHeading>Raspored nastave</PageHeaderHeading>
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Dodaj aktivnost</CardTitle>
                    <CardDescription>
                        Used to identify your store in the marketplace.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <Input placeholder="Store Name"/>
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                    <CardTitle>Dodaj podaktivnost</CardTitle>
                    <CardDescription>
                        The directory within your project, in which your plugins are
                        located.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <Input
                            placeholder="Project Name"
                            defaultValue="/content/plugins"
                        />
                        <div className="flex items-center space-x-2">
                            <Checkbox id="include" defaultChecked/>
                            <label
                                htmlFor="include"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Allow administrators to change the directory.
                            </label>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </div>
    )
}