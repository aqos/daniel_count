import { RoadType } from './RoadType';
import { DepartmentCouple } from './DepartmentCouple';
import { Count } from './Count';

export class Road {
    id: number;
    name: string;
    // tslint:disable-next-line: variable-name
    section_code: string;
    origin: string;
    destination: string;
    range: number;
    // tslint:disable-next-line: variable-name
    road_type_id: number;
    // tslint:disable-next-line: variable-name
    department_couple_id: number;
    counts: Count[] = [];
    // tslint:disable-next-line: variable-name
    department_couple: DepartmentCouple;
    // tslint:disable-next-line: variable-name
    road_type: RoadType;
    // tslint:disable-next-line: variable-name
    created_at: string;
    // tslint:disable-next-line: variable-name
    updated_at: string;
}
