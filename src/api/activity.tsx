import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {toast} from "@/components/ui/use-toast.ts";

export async function getActivities() {
    const response = await fetch(`${BASE_API_URL}/api/activities/all`, {
        method: "GET",
        headers: {
            Origin: origin,
            Authorization: authHeader(),
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}


export const addActivity = async (name: string) => {
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

export const addSubActivity = async (name: string, activityId: string) => {
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