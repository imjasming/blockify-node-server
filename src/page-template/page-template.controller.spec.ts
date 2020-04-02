import { Test, TestingModule } from '@nestjs/testing';
import { PageTemplateController } from './page-template.controller';

describe('PageTemplate Controller', () => {
  let controller: PageTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageTemplateController],
    }).compile();

    controller = module.get<PageTemplateController>(PageTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
