import {Teacher} from "@/model/Teacher.ts";
import {School} from "@/model/School.ts";

export interface SchoolClass {
    id: number;
    year: number;
    division: string;
    teacher: Teacher;
    school: School;
}