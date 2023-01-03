import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Workshift} from './workshift.model';

@model()
export class Schedule extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'number',
    required: true,
  })
  day: number;

  @property({
    type: 'string',
  })
  startTime?: string;

  @property({
    type: 'string',
  })
  endTime?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  state?: boolean;

  @belongsTo(() => Workshift, {name: 'workshift'})
  idWorkshift: string;

  constructor(data?: Partial<Schedule>) {
    super(data);
  }
}

export interface ScheduleRelations {
  // describe navigational properties here
}

export type ScheduleWithRelations = Schedule & ScheduleRelations;
