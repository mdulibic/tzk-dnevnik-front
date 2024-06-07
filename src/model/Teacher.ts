import {SchoolEvent} from "@/model/SchoolEvent.ts";
import {SchoolClass} from "@/model/SchoolClass.ts";
import {School} from "@/model/School.ts";

export interface Teacher {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    role: string;
    classesTeaching: SchoolClass[];
    events: SchoolEvent[];
    school: School;
}
