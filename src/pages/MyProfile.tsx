import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
