import {Teacher} from "@/model/Teacher.ts";


export interface SchoolClass {
    id: number;
    year: number;
    division: string;
    teacher: Teacher;
}