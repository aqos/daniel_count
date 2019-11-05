import { Road } from './Road';

export class DepartmentCouple {
    id: number;
    name: string;
    roads: Road[] = [];
    // tslint:disable-next-line: variable-name
    created_at: string;
    // tslint:disable-next-line: variable-name
    updated_at: string;
}
