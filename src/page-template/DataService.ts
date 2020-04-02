import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Template } from './dto/template.dto';

const DBLOG_PREFIX = '[db-service]:';

const existCheck = (object, keysWithErrorInfo, prefix = '') => {
  const keys = Object.keys(keysWithErrorInfo);
  const errors = keys.map(key => {
    if (object[key]) {
      return true;
    }
    return new Error(`${prefix}, ${key}, ${keysWithErrorInfo[key]}`);
  }).filter(item => item instanceof Error);

  // return first error or true
  if (errors.length) {
    return errors[0];
  }
  return true;
};

@Injectable()
export default class DataService {
  constructor(@InjectModel('Template')private templateModel: Model<Template>) {
  }

  // CRUD for Template
  async queryManyTemplates({ conditions = {} } = {}) {
    const query = await this.templateModel.find(conditions)
      .catch(err => {
        throw err;
      });
    return query;
  }

  async queryTemplate({ conditions = {} } = {}) {
    const checkResult = existCheck(conditions, {
      id: 'should not be undefined.',
    }, 'queryTemplate');
    if (checkResult instanceof Error) {
      throw new Error(`${DBLOG_PREFIX} ${checkResult.toString()}`);
    }

    const query = await this.templateModel.findOne(conditions)
      .catch(err => {
        throw err;
      });
    return query;
  }

  async createTemplate({ payload = {} }) {
    const newTemplate = new this.templateModel.Template(payload);
    const query = await newTemplate.save()
      .catch(err => {
        throw err;
      });
    return query;
  }

  async updateTemplate({ conditions = {}, payload = {} }) {
    const checkResult = existCheck(conditions, {
      id: 'should not be undefined.',
    }, 'updateTemplate');
    if (checkResult instanceof Error) {
      throw new Error(`${DBLOG_PREFIX} ${checkResult.toString()}`);
    }

    const query = await this.templateModel.updateOne(conditions, payload)
      .catch(err => {
        throw err;
      });
    return query;
  }

  async deleteTemplate({ conditions = {} }) {
    const checkResult = existCheck(conditions, {
      id: 'should not be undefined.',
    }, 'deleteTemplate');
    if (checkResult instanceof Error) {
      throw new Error(`${DBLOG_PREFIX} ${checkResult.toString()}`);
    }

    const query = await this.templateModel.deleteOne(conditions)
      .catch(err => {
        throw err;
      });
    return query;
  }
}
