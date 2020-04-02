import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { writeFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Controller('file')
export class FileController {

  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file, @Body() body) {
    const fileName = path.join(this.configService.get<string>('filePath.temporaryDir'), file.originalname);
    writeFileSync(fileName, file.stream);
  }
}
