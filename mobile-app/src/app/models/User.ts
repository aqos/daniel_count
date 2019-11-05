import { Person } from './Person';
import { Count } from './Count';

export class User {
    id: number;
    name: string;
    email: string;
    // tslint:disable-next-line: variable-name
    email_verified_at: string;
    person: Person;
    counts: Count[];
    // tslint:disable-next-line: variable-name
    created_at: string;
    // tslint:disable-next-line: variable-name
    updated_at: string;
}
