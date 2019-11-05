import { TimeSlot } from './TimeSlot';
import { User } from './User';
import { Weather } from './Weather';
import { CarCategory } from './CarCategory';
import { Road } from './Road';

export class Count {
    id: number;
    // tslint:disable-next-line: variable-name
    user_id: number;
    // tslint:disable-next-line: variable-name
    road_id: number;
    // tslint:disable-next-line: variable-name
    weather_id: number;
    // tslint:disable-next-line: variable-name
    car_category_id: number;
    // tslint:disable-next-line: variable-name
    time_slot_id: number;
    counts: number[] = [];
    // tslint:disable-next-line: variable-name
    car_category: CarCategory;
    weather: Weather;
    road: Road;
    user: User;
    // tslint:disable-next-line: variable-name
    time_slot: TimeSlot;
    // tslint:disable-next-line: variable-name
    created_at: string;
    // tslint:disable-next-line: variable-name
    updated_at: string;
}
