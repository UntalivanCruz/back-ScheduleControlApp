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
  Schedule,
} from '../models';
import {WorkshiftRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class WorkshiftScheduleController {
  constructor(
    @repository(WorkshiftRepository) protected workshiftRepository: WorkshiftRepository,
  ) { }

  @get('/workshifts/{id}/schedules', {
    responses: {
      '200': {
        description: 'Array of Workshift has many Schedule',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Schedule)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Schedule>,
  ): Promise<Schedule[]> {
    return this.workshiftRepository.schedules(id).find(filter);
  }

  @post('/workshifts/{id}/schedules', {
    responses: {
      '200': {
        description: 'Workshift model instance',
        content: {'application/json': {schema: getModelSchemaRef(Schedule)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Workshift.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Schedule, {
            title: 'NewScheduleInWorkshift',
            exclude: ['id'],
            optional: ['idWorkshift']
          }),
        },
      },
    }) schedule: Omit<Schedule, 'id'>,
  ): Promise<Schedule> {
    return this.workshiftRepository.schedules(id).create(schedule);
  }

  @patch('/workshifts/{id}/schedules', {
    responses: {
      '200': {
        description: 'Workshift.Schedule PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Schedule, {partial: true}),
        },
      },
    })
    schedule: Partial<Schedule>,
    @param.query.object('where', getWhereSchemaFor(Schedule)) where?: Where<Schedule>,
  ): Promise<Count> {
    return this.workshiftRepository.schedules(id).patch(schedule, where);
  }

  @del('/workshifts/{id}/schedules', {
    responses: {
      '200': {
        description: 'Workshift.Schedule DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Schedule)) where?: Where<Schedule>,
  ): Promise<Count> {
    return this.workshiftRepository.schedules(id).delete(where);
  }
}
