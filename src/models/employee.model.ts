import {Entity, model, property, belongsTo} from '@loopback/repository';
import {EmployeePositions} from './employee-positions.model';

@model()
export class Employee extends Entity {
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
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  identification: string;

  @property({
    type: 'date',
  })
  dateBirth?: string;

  @property({
    type: 'string',
    default: 'none',
  })
  gender?: string;

  @property({
    type: 'string',
    required: true,
  })
  nationality: string;
  @property({
    type: 'boolean',
    default: true,
  })
  state?: boolean;

  @belongsTo(() => EmployeePositions, {name: 'EmployeePositions'})
  idEmployeePositions: string;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
