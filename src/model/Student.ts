import {SchoolClass} from "@/model/SchoolClass.ts";
import {Gender} from "@/model/Gender.ts";

export type Student = {
    id: number;
    name: string;
    surname: string;
    username: string;
    password: string;
    email: string;
    role: string;
    schoolClass: SchoolClass;
    weight: number;
    height: number;
    gender: Gender;
};