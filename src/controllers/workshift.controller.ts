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
import {Workshift} from '../models';
import {WorkshiftRepository} from '../repositories';

export class WorkshiftController {
  constructor(
    @repository(WorkshiftRepository)
    public workshiftRepository : WorkshiftRepository,
  ) {}

  @post('/workshifts')
  @response(200, {
    description: 'Workshift model instance',
    content: {'application/json': {schema: getModelSchemaRef(Workshift)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workshift, {
            title: 'NewWorkshift',
            exclude: ['id'],
          }),
        },
      },
    })
    workshift: Omit<Workshift, 'id'>,
  ): Promise<Workshift> {
    return this.workshiftRepository.create(workshift);
  }

  @get('/workshifts/count')
  @response(200, {
    description: 'Workshift model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Workshift) where?: Where<Workshift>,
  ): Promise<Count> {
    return this.workshiftRepository.count(where);
  }

  @get('/workshifts')
  @response(200, {
    description: 'Array of Workshift model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Workshift, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Workshift) filter?: Filter<Workshift>,
  ): Promise<Workshift[]> {
    return this.workshiftRepository.find(filter);
  }

  @patch('/workshifts')
  @response(200, {
    description: 'Workshift PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workshift, {partial: true}),
        },
      },
    })
    workshift: Workshift,
    @param.where(Workshift) where?: Where<Workshift>,
  ): Promise<Count> {
    return this.workshiftRepository.updateAll(workshift, where);
  }

  @get('/workshifts/{id}')
  @response(200, {
    description: 'Workshift model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Workshift, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Workshift, {exclude: 'where'}) filter?: FilterExcludingWhere<Workshift>
  ): Promise<Workshift> {
    return this.workshiftRepository.findById(id, filter);
  }

  @patch('/workshifts/{id}')
  @response(204, {
    description: 'Workshift PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workshift, {partial: true}),
        },
      },
    })
    workshift: Workshift,
  ): Promise<void> {
    await this.workshiftRepository.updateById(id, workshift);
  }

  @put('/workshifts/{id}')
  @response(204, {
    description: 'Workshift PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() workshift: Workshift,
  ): Promise<void> {
    await this.workshiftRepository.replaceById(id, workshift);
  }

  @del('/workshifts/{id}')
  @response(204, {
    description: 'Workshift DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.workshiftRepository.deleteById(id);
  }
}
