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
  Workshift,
  EmployeePositions,
} from '../models';
import {WorkshiftRepository} from '../repositories';

export class WorkshiftEmployeePositionsController {
  constructor(
    @repository(WorkshiftRepository) protected workshiftRepository: WorkshiftRepository,
  ) { }

  @get('/workshifts/{id}/employee-positions', {
    responses: {
      '200': {
        description: 'Array of Workshift has many EmployeePositions',
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
    return this.workshiftRepository.employeePositions(id).find(filter);
  }

  @post('/workshifts/{id}/employee-positions', {
    responses: {
      '200': {
        description: 'Workshift model instance',
        content: {'application/json': {schema: getModelSchemaRef(EmployeePositions)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Workshift.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmployeePositions, {
            title: 'NewEmployeePositionsInWorkshift',
            exclude: ['id'],
            optional: ['idWorkshift']
          }),
        },
      },
    }) employeePositions: Omit<EmployeePositions, 'id'>,
  ): Promise<EmployeePositions> {
    return this.workshiftRepository.employeePositions(id).create(employeePositions);
  }

  @patch('/workshifts/{id}/employee-positions', {
    responses: {
      '200': {
        description: 'Workshift.EmployeePositions PATCH success count',
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
    return this.workshiftRepository.employeePositions(id).patch(employeePositions, where);
  }

  @del('/workshifts/{id}/employee-positions', {
    responses: {
      '200': {
        description: 'Workshift.EmployeePositions DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EmployeePositions)) where?: Where<EmployeePositions>,
  ): Promise<Count> {
    return this.workshiftRepository.employeePositions(id).delete(where);
  }
}
