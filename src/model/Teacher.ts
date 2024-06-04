import {SchoolEvent} from "@/model/SchoolEvent.ts";
import {SchoolClass} from "@/model/SchoolClass.ts";

export interface Teacher {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    role: string;
    classesTeaching: SchoolClass[];
    events: SchoolEvent[];
}
