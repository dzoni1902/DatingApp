import { Photo } from "./photo";


export interface User {
    id: number;
    username: string;
    gender: string;
    knownAs: string;
    age: number;
    created: Date;
    lastActive: Date;
    city: string;
    state: string;
    photoUrl: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}
