export interface School {
    id: number;
    name: string;
    county: string;
    city: string;

}

export enum SchoolType {
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECONDARY',
}
