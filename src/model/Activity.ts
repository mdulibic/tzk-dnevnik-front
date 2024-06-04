export interface Activity {
    id: number;
    name: string;
    subactivities: SubActivity[];
}

export interface SubActivity {
    id: number;
    name: string;
    parentActivity: Activity;
}