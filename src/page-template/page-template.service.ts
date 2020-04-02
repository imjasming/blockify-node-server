import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Template } from './dto/template.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PageTemplateService {
  constructor(@InjectModel('Template') private readonly templateModel: Model<Template>) {
  }


}
