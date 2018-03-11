import { Car } from "./car";

export class Response {
    contents: Car[];
    totalElements: number;
    totalPages: number;
    lasts: string;
    sizes: number;
    numbers:number;
    sorts: string;
    firsts: string;
    numberOfElements: string;
}