import { Count } from './Count';

export class CarCategory {
    id: number;
    name: string;
    avatar: string;
    // tslint:disable-next-line: variable-name
    created_at: string;
    // tslint:disable-next-line: variable-name
    updated_at: string;
    counts: Count[] = [];
}
