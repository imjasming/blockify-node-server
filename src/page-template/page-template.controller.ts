import * as path from 'path';
import { Controller } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { ConfigService } from '@nestjs/config';

@Controller('page-template')
export class PageTemplateController {
  private utilsService: UtilsService;
  private configService: ConfigService;

  constructor(utilsService: UtilsService, configService: ConfigService) {
    this.utilsService = utilsService;
    this.configService = configService;
  }


  async makePageTemplate(context, templateId, pageId) {
    const { service } = context;

    const template = await service.db.queryTemplate({
      conditions: {
        id: templateId,
      },
    });

    const templateZipFilePath = path.join(this.configService.get('filePath.resourcesPath.templateDir'), template.files);
    const templateDir = path.join(this.configService.get('filePath.pageTemplateGenDir'), pageId);

    await this.utilsService.execShell([
      `mkdir -p ${templateDir}`,
      `unzip -o ${templateZipFilePath} -d ${templateDir}`]);
  };

  async copyTemplateConfig(context, pageId) {
    const pageTemplateGenDir = path.join(this.configService.get('filePath.pageTemplateGenDir'), pageId);
    const templateDir = path.join(pageTemplateGenDir, 'server/config');
    const baseConfigPath = path.join(templateDir, 'base-config.json');
    const originBaseConfigPath = path.join(templateDir, 'base-config-origin.json');
    const templatePath = path.join(templateDir, 'components.json');
    const originTemplatePath = path.join(templateDir, 'components-origin.json');

    await this.utilsService.execShell([
      `cp -rf ${baseConfigPath} ${originBaseConfigPath}`,
      `cp -rf ${templatePath} ${originTemplatePath}`]);
  };

  async makePagepipelineFromTemplate(context, templateId, pageId) {

    await this.makePageTemplate(context, templateId, pageId);
    await this.copyTemplateConfig(context, pageId);
    await this.utilsService.execShell([
      `cd ./app/public/gen/${pageId}/server`,
      'node node.js preview']);
  };

  async makePagepipelineFromPage(context, templateId, pageId) {
    const { service } = context;

    const page = await service.page.getPageById(pageId);

    const pageZipFilePath = path.join(this.configService.get('filePath..resourcesPath.pageDir'), page.files);
    const pagepipelineDir = path.join(this.configService.get('filePath.pageTemplateGenDir'), pageId);
    const templatepipelineDir = path.join(pagepipelineDir, 'server/config');

    await makePagePipelineTemplate(context, templateId, pageId);
    await ctx.helper.execShell([`unzip -o ${pageZipFilePath} -d ${templatepipelineDir}`]);
    await copyTemplateConfig(context, pageId);
    await ctx.helper.execShell([
      `cd ./app/public/pipelines/${pageId}/server`,
      'node node.js preview']);
  };

// 构建用于发布页面源码
  const;
  makePageActivity = async (context, pageId) => {
    const { ctx, config } = context;
    const pagepipelineServerDir = path.join(config.baseDir, 'app/public/pipelines', pageId, 'server');
    const pageActivityDir = path.join(config.baseDir, 'app/public/activities', pageId);

    // 复制 pipelines 到 activities, 并执行页面发布的构建
    await ctx.helper.execShell([
      `mkdir -p ${pageActivityDir}`,
      `cp -rf ${pagepipelineServerDir} ${pageActivityDir}`,
      `cd ./app/public/activities/${pageId}/server`,
      'node node.js release']);

    // 基于 dist 创建纯净的发布目录
    await ctx.helper.execShell([
      `mkdir -p ./app/public/activities/${pageId}/${pageId}`,
      `cp -rf ./app/public/activities/${pageId}/server/dist/* ./app/public/activities/${pageId}/${pageId}`,
      `cd ./app/public/activities/${pageId}/${pageId}`,
      'rm -f index-origin.html',
      'rm -f vue-ssr-server-bundle.json',
      'rm -f vue-ssr-client-manifest.json']);
  };
}
