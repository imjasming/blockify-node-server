import * as path from 'path';
import { registerAs } from '@nestjs/config';

const baseDir = process.cwd();
const appResDir = path.join(baseDir, 'app')

export default registerAs('filePath',
  () => {
    const resourceBaseDir = path.join(baseDir, 'resources');
    return ({
      baseDir: baseDir,
      resourcesPath: {
        templateDir: path.join(resourceBaseDir, 'template'),
        pageDir: path.join(resourceBaseDir, 'page'),
      },
      publicDir: path.join(appResDir, 'public'),
      temporaryDir: path.join(appResDir, 'public', 'temp'),
      pageTemplateGenDir: path.join(appResDir, 'public', 'gen')
    });
  });
