import {Activity, SubActivity} from "@/model/Activity.ts";
import {Student} from "@/model/Student.ts";

export interface ActivityResult {
    id: number;
    student: Student;
    activity: Activity;
    subactivity: SubActivity;
    result: number;
    unit: string;
    timestamp: string
}
