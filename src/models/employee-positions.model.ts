import {Entity, model, property, hasMany} from '@loopback/repository';
import {Employee} from './employee.model';

@model()
export class EmployeePositions extends Entity {
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
    type: 'string',
    required: true,
  })
  idDeparment: string;

  @property({
    type: 'string',
    required: true,
  })
  idShift: string;

  @property({
    type: 'boolean',
    default: true,
  })
  state?: boolean;

  @hasMany(() => Employee, {keyTo: 'idEmployeePositions'})
  employees: Employee[];

  constructor(data?: Partial<EmployeePositions>) {
    super(data);
  }
}

export interface EmployeePositionsRelations {
  // describe navigational properties here
}

export type EmployeePositionsWithRelations = EmployeePositions & EmployeePositionsRelations;
