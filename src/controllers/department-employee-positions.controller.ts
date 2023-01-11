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
  Department,
  EmployeePositions,
} from '../models';
import {DepartmentRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class DepartmentEmployeePositionsController {
  constructor(
    @repository(DepartmentRepository) protected departmentRepository: DepartmentRepository,
  ) { }

  @get('/departments/{id}/employee-positions', {
    responses: {
      '200': {
        description: 'Array of Department has many EmployeePositions',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EmployeePositions)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EmployeePositions>,
  ): Promise<EmployeePositions[]> {
    return this.departmentRepository.employeePositions(id).find(filter);
  }

  @post('/departments/{id}/employee-positions', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: {'application/json': {schema: getModelSchemaRef(EmployeePositions)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Department.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmployeePositions, {
            title: 'NewEmployeePositionsInDepartment',
            exclude: ['id'],
            optional: ['idDepartment']
          }),
        },
      },
    }) employeePositions: Omit<EmployeePositions, 'id'>,
  ): Promise<EmployeePositions> {
    return this.departmentRepository.employeePositions(id).create(employeePositions);
  }

  @patch('/departments/{id}/employee-positions', {
    responses: {
      '200': {
        description: 'Department.EmployeePositions PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmployeePositions, {partial: true}),
        },
      },
    })
    employeePositions: Partial<EmployeePositions>,
    @param.query.object('where', getWhereSchemaFor(EmployeePositions)) where?: Where<EmployeePositions>,
  ): Promise<Count> {
    return this.departmentRepository.employeePositions(id).patch(employeePositions, where);
  }

  @del('/departments/{id}/employee-positions', {
    responses: {
      '200': {
        description: 'Department.EmployeePositions DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EmployeePositions)) where?: Where<EmployeePositions>,
  ): Promise<Count> {
    return this.departmentRepository.employeePositions(id).delete(where);
  }
}
