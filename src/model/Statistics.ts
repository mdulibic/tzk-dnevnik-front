import {Activity, SubActivity} from "@/model/Activity.ts";
import {ActivityResult} from "@/model/ActivityResult.ts";

export type Statistics = {
    activity: Activity;
    subactivity: SubActivity;
    results: ActivityResult[];
    averageResult: number;
};