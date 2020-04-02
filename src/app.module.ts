import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PageTemplateModule } from './page-template/page-template.module';
import { UtilsModule } from './utils/utils.module';
import filePathConfig from './config/filePath.config';

// 注意，这里路径要指向存放配置文件的config文件夹
//ConfigModule.load(path.resolve(__dirname, '..', 'config', '**/!(*.d).{ts,js}'));

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:[`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      load: [filePathConfig],
    }),
    MongooseModule.forRoot(''),
    FileModule,
    PageTemplateModule,
    UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
