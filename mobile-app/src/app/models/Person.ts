import { User } from './User';

export class Person {
    id: number;
    // tslint:disable-next-line: variable-name
    first_name: string;
    // tslint:disable-next-line: variable-name
    last_name: string;
    // tslint:disable-next-line: variable-name
    birth_date: string;
    // tslint:disable-next-line: variable-name
    birth_place: string;
    phone: string;
    // tslint:disable-next-line: variable-name
    piece_number: string;
    // tslint:disable-next-line: variable-name
    user_id: number;
    user: User;
    // tslint:disable-next-line: variable-name
    created_at: string;
    // tslint:disable-next-line: variable-name
    updated_at: string;
}
