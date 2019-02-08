import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Agenda} from '../models';
import {AgendaRepository} from '../repositories';

import axios from 'axios';
const _ = require('lodash');

export class AgendaController {
  constructor(
    @repository(AgendaRepository)
    public agendaRepository: AgendaRepository,
  ) {}

  @post('/agenda', {
    responses: {
      '200': {
        description: 'Agenda model instance',
        content: {'application/json': {schema: {'x-ts-type': Agenda}}},
      },
    },
  })
  async create(@requestBody() agenda: Agenda): Promise<Agenda> {
    return await this.agendaRepository.create(agenda);
  }

  @get('/agenda/count', {
    responses: {
      '200': {
        description: 'Agenda model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Agenda)) where?: Where,
  ): Promise<Count> {
    return await this.agendaRepository.count(where);
  }

  @get('/agenda', {
    responses: {
      '200': {
        description: 'Array of Agenda model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Agenda}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Agenda)) filter?: Filter,
  ): Promise<Agenda[]> {
    return await this.agendaRepository.find(filter);
  }

  @patch('/agenda', {
    responses: {
      '200': {
        description: 'Agenda PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() agenda: Agenda,
    @param.query.object('where', getWhereSchemaFor(Agenda)) where?: Where,
  ): Promise<Count> {
    return await this.agendaRepository.updateAll(agenda, where);
  }

  @get('/agenda/{id}', {
    responses: {
      '200': {
        description: 'Agenda model instance',
        content: {'application/json': {schema: {'x-ts-type': Agenda}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Agenda> {
    return await this.agendaRepository.findById(id);
  }

  @patch('/agenda/{id}', {
    responses: {
      '204': {
        description: 'Agenda PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() agenda: Agenda,
  ): Promise<void> {
    await this.agendaRepository.updateById(id, agenda);
  }

  @put('/agenda/{id}', {
    responses: {
      '204': {
        description: 'Agenda PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() agenda: Agenda,
  ): Promise<void> {
    await this.agendaRepository.replaceById(id, agenda);
  }

  @del('/agenda/{id}', {
    responses: {
      '204': {
        description: 'Agenda DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.agendaRepository.deleteById(id);
  }

  @get('/newagenda', {
    responses: {
      '200': {
        description: 'Array of Agenda model instances',
        content: {
          'application/json': {
            schema: {type: 'object'},
          },
        },
      },
    },
  })
  async fullSched() {
    console.time('agenda');
    const ROOT_URL = 'http://192.168.0.186:3000/redistestarray?';

    const agenda = await this.agendaRepository.find();

    let customers: any = new Array();
    customers = _.map(agenda, (el: any) => {
      return `c=${el.id_customer}`;
    });

    let professionals: any = new Array();
    professionals = _.map(agenda, (el: any) => {
      return `p=${el.id_pro}`;
    });

    let services: any = new Array();
    services = _.map(agenda, (el: any) => {
      return `s=${el.id_service}`;
    });

    const query =
      customers.join('&') +
      '&' +
      professionals.join('&') +
      '&' +
      services.join('&');

    const cps = await axios.get(`${ROOT_URL}${query}`);

    let result: any = new Object();
    result = _.map(agenda, (el: any) => {
      return {
        id: el.id,
        datahora: el.datahora,
        customer: cps.data.customers[el.id_customer],
        professional: cps.data.professionals[el.id_pro],
        service: cps.data.services[el.id_service],
      };
    });
    console.timeEnd('agenda');
    return result;
  }
}
