import {SchoolClass} from "@/model/SchoolClass.ts";

export type Student = {
    id: number;
    name: string;
    surname: string;
    username: string;
    password: string;
    email: string;
    role: string;
    schoolClass: SchoolClass;
};