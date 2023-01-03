import {Entity, model, property, hasMany} from '@loopback/repository';
import {EmployeePositions} from './employee-positions.model';
import {Schedule} from './schedule.model';

@model()
export class Workshift extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    default: true,
  })
  state?: boolean;

  @hasMany(() => EmployeePositions, {keyTo: 'idWorkshift'})
  employeePositions: EmployeePositions[];

  @hasMany(() => Schedule, {keyTo: 'idWorkshift'})
  schedules: Schedule[];

  constructor(data?: Partial<Workshift>) {
    super(data);
  }
}

export interface WorkshiftRelations {
  // describe navigational properties here
}

export type WorkshiftWithRelations = Workshift & WorkshiftRelations;
