import {Entity, model, property, hasMany} from '@loopback/repository';
import {EmployeePositions} from './employee-positions.model';

@model()
export class Department extends Entity {
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

  @hasMany(() => EmployeePositions, {keyTo: 'idDepartment'})
  employeePositions: EmployeePositions[];

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  // describe navigational properties here
}

export type DepartmentWithRelations = Department & DepartmentRelations;
