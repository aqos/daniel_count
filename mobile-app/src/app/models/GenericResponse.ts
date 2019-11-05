import { User } from './User';
import { CarCategory } from './CarCategory';
import { Weather } from './Weather';
import { Road } from './Road';
import { TimeSlot } from './TimeSlot';
import { Count } from './Count';
import { DepartmentCouple } from './DepartmentCouple';
import { Token } from './Token';

export class GenericResponse {
    status: string;
    message: string;
    token: Token;
    errors: any;
    user: User;
    // tslint:disable-next-line: variable-name
    car_categories: CarCategory[] = [];
    weathers: Weather[] = [];
    roads: Road[] = [];
    road: Road = new Road();
    // tslint:disable-next-line: variable-name
    time_slots: TimeSlot[] = [];
    counts: Count[] = [];
    // tslint:disable-next-line: variable-name
    department_couples: DepartmentCouple[];
}
