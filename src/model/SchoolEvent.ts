import {Event} from "react-big-calendar";
import {Activity, SubActivity} from "@/model/Activity.ts";
import {SchoolClass} from "@/model/SchoolClass.ts";
import {Teacher} from "@/model/Teacher.ts";

export interface Tag {
    id: string
    title: string
    color?: string
}

export interface SchoolEvent extends Event {
    id: number;
    title: string;
    description: string;
    startTimestamp: string;
    endTimestamp: string;
    allDay: boolean;
    activity: Activity;
    subActivity?: SubActivity;
    schoolClass: SchoolClass;
    tag?: Tag;
    teacher: Teacher;
}