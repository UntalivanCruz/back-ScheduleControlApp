import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EmployeePositions} from '../models';
import {EmployeePositionsRepository} from '../repositories';

export class EmployeePositionsController {
  constructor(
    @repository(EmployeePositionsRepository)
    public employeePositionsRepository : EmployeePositionsRepository,
  ) {}

  @post('/employee-positions')
  @response(200, {
    description: 'EmployeePositions model instance',
    content: {'application/json': {schema: getModelSchemaRef(EmployeePositions)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmployeePositions, {
            title: 'NewEmployeePositions',
            exclude: ['id'],
          }),
        },
      },
    })
    employeePositions: Omit<EmployeePositions, 'id'>,
  ): Promise<EmployeePositions> {
    return this.employeePositionsRepository.create(employeePositions);
  }

  @get('/employee-positions/count')
  @response(200, {
    description: 'EmployeePositions model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EmployeePositions) where?: Where<EmployeePositions>,
  ): Promise<Count> {
    return this.employeePositionsRepository.count(where);
  }

  @get('/employee-positions')
  @response(200, {
    description: 'Array of EmployeePositions model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EmployeePositions, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EmployeePositions) filter?: Filter<EmployeePositions>,
  ): Promise<EmployeePositions[]> {
    return this.employeePositionsRepository.find(filter);
  }

  @patch('/employee-positions')
  @response(200, {
    description: 'EmployeePositions PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmployeePositions, {partial: true}),
        },
      },
    })
    employeePositions: EmployeePositions,
    @param.where(EmployeePositions) where?: Where<EmployeePositions>,
  ): Promise<Count> {
    return this.employeePositionsRepository.updateAll(employeePositions, where);
  }

  @get('/employee-positions/{id}')
  @response(200, {
    description: 'EmployeePositions model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EmployeePositions, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EmployeePositions, {exclude: 'where'}) filter?: FilterExcludingWhere<EmployeePositions>
  ): Promise<EmployeePositions> {
    return this.employeePositionsRepository.findById(id, filter);
  }

  @patch('/employee-positions/{id}')
  @response(204, {
    description: 'EmployeePositions PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmployeePositions, {partial: true}),
        },
      },
    })
    employeePositions: EmployeePositions,
  ): Promise<void> {
    await this.employeePositionsRepository.updateById(id, employeePositions);
  }

  @put('/employee-positions/{id}')
  @response(204, {
    description: 'EmployeePositions PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() employeePositions: EmployeePositions,
  ): Promise<void> {
    await this.employeePositionsRepository.replaceById(id, employeePositions);
  }

  @del('/employee-positions/{id}')
  @response(204, {
    description: 'EmployeePositions DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.employeePositionsRepository.deleteById(id);
  }
}
