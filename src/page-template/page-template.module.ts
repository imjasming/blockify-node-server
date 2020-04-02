import { Module } from '@nestjs/common';
import { PageTemplateController } from './page-template.controller';
import { UtilsService } from '../utils/utils.service';
import { PageTemplateService } from './page-template.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateSchema } from './template.schema';

@Module({
  controllers: [PageTemplateController],
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Template', schema: TemplateSchema },
      ]),
    UtilsService,
  ],
  providers: [PageTemplateService],
})
export class PageTemplateModule {
}
