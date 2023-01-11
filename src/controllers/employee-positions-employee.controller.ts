import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  EmployeePositions,
  Employee,
} from '../models';
import {EmployeePositionsRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class EmployeePositionsEmployeeController {
  constructor(
    @repository(EmployeePositionsRepository) protected employeePositionsRepository: EmployeePositionsRepository,
  ) { }

  @get('/employee-positions/{id}/employees', {
    responses: {
      '200': {
        description: 'Array of EmployeePositions has many Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.employeePositionsRepository.employees(id).find(filter);
  }

  @post('/employee-positions/{id}/employees', {
    responses: {
      '200': {
        description: 'EmployeePositions model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EmployeePositions.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployeeInEmployeePositions',
            exclude: ['id'],
            optional: ['idEmployeePositions']
          }),
        },
      },
    }) employee: Omit<Employee, 'id'>,
  ): Promise<Employee> {
    return this.employeePositionsRepository.employees(id).create(employee);
  }

  @patch('/employee-positions/{id}/employees', {
    responses: {
      '200': {
        description: 'EmployeePositions.Employee PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Partial<Employee>,
    @param.query.object('where', getWhereSchemaFor(Employee)) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeePositionsRepository.employees(id).patch(employee, where);
  }

  @del('/employee-positions/{id}/employees', {
    responses: {
      '200': {
        description: 'EmployeePositions.Employee DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Employee)) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeePositionsRepository.employees(id).delete(where);
  }
}
