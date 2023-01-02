import {Entity, model, property} from '@loopback/repository';

@model()
export class Attendance extends Entity {
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
  idEmployee: string;

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


  constructor(data?: Partial<Attendance>) {
    super(data);
  }
}

export interface AttendanceRelations {
  // describe navigational properties here
}

export type AttendanceWithRelations = Attendance & AttendanceRelations;
