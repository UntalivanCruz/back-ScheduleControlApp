import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Employee} from './employee.model';

@model()
export class Attendance extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    required: true,
  })
  day: number;

  @property({
    type: 'string',
  })
  startTime: string;

  @property({
    type: 'string',
  })
  endTime?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  state?: boolean;

  @belongsTo(() => Employee, {name: 'Employee'})
  idEmployee: string;

  constructor(data?: Partial<Attendance>) {
    super(data);
  }
}

export interface AttendanceRelations {
  // describe navigational properties here
}

export type AttendanceWithRelations = Attendance & AttendanceRelations;
