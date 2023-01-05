import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Employee} from './employee.model';
import {Department} from './department.model';
import {Workshift} from './workshift.model';

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
    type: 'boolean',
    default: true,
  })
  status?: boolean;

  @hasMany(() => Employee, {keyTo: 'idEmployeePositions'})
  employees: Employee[];

  @belongsTo(() => Department, {name: 'Department'})
  idDepartment: string;

  @belongsTo(() => Workshift, {name: 'workshift'})
  idWorkshift: string;

  constructor(data?: Partial<EmployeePositions>) {
    super(data);
  }
}

export interface EmployeePositionsRelations {
  // describe navigational properties here
}

export type EmployeePositionsWithRelations = EmployeePositions & EmployeePositionsRelations;
