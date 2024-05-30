import {PageHeader, PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export default function Students() {
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Empty Page</PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description.</CardDescription>
                </CardHeader>
            </Card>
        </>
    )
}
