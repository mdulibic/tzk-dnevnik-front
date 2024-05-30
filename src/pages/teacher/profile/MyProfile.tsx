import { PageHeader, PageHeaderHeading } from "@/components/core/PageHeader.tsx";
import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";

export default function MyProfile() {
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Moj Profil</PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>Postavke</CardTitle>
                </CardHeader>
            </Card>
        </>
    )
}
