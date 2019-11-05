import { Count } from './Count';

export class TimeSlot {
    id: number;
    // tslint:disable-next-line: variable-name
    time_slot: string;
    start: number;
    counts: Count[] = [];
    // tslint:disable-next-line: variable-name
    created_at: string;
    // tslint:disable-next-line: variable-name
    updated_at: string;
}
