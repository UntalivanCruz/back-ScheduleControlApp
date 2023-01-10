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
import {Schedule} from '../models';
import {ScheduleRepository} from '../repositories';

export class ScheduleController {
  constructor(
    @repository(ScheduleRepository)
    public scheduleRepository : ScheduleRepository,
  ) {}

  @post('/schedules')
  @response(200, {
    description: 'Schedule model instance',
    content: {'application/json': {schema: getModelSchemaRef(Schedule)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Schedule, {
            title: 'NewSchedule',
            exclude: ['id'],
          }),
        },
      },
    })
    schedule: Omit<Schedule, 'id'>,
  ): Promise<Schedule> {
    const insert = await this.scheduleRepository.create(schedule);
    return this.scheduleRepository.findById(insert.id,{'include':[{'relation': 'workshift'}]})

  }

  @get('/schedules/count')
  @response(200, {
    description: 'Schedule model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Schedule) where?: Where<Schedule>,
  ): Promise<Count> {
    return this.scheduleRepository.count(where);
  }

  @get('/schedules')
  @response(200, {
    description: 'Array of Schedule model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Schedule, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Schedule) filter?: Filter<Schedule>,
  ): Promise<Schedule[]> {
    return this.scheduleRepository.find(filter);
  }

  @patch('/schedules')
  @response(200, {
    description: 'Schedule PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Schedule, {partial: true}),
        },
      },
    })
    schedule: Schedule,
    @param.where(Schedule) where?: Where<Schedule>,
  ): Promise<Count> {
    return this.scheduleRepository.updateAll(schedule, where);
  }

  @get('/schedules/{id}')
  @response(200, {
    description: 'Schedule model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Schedule, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Schedule, {exclude: 'where'}) filter?: FilterExcludingWhere<Schedule>
  ): Promise<Schedule> {
    return this.scheduleRepository.findById(id, filter);
  }

  @patch('/schedules/{id}')
  @response(204, {
    description: 'Schedule PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Schedule, {partial: true}),
        },
      },
    })
    schedule: Schedule,
  ): Promise<Schedule> {
    await this.scheduleRepository.updateById(id, schedule);
    return this.scheduleRepository.findById(id,{'include':[{'relation': 'workshift'}]})
  }

  @put('/schedules/{id}')
  @response(204, {
    description: 'Schedule PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() schedule: Schedule,
  ): Promise<void> {
    await this.scheduleRepository.replaceById(id, schedule);
  }

  @del('/schedules/{id}')
  @response(204, {
    description: 'Schedule DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.scheduleRepository.deleteById(id);
  }
}
