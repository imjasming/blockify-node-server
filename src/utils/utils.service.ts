import { Injectable } from '@nestjs/common';
import { exec } from "child_process";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UtilsService {
  //private config: ConfigService;

  /*constructor(config: ConfigService) {
    this.config = config;
  }*/

  execShell (shellCommands:string | Array<string> = 'pwd') {
    const shellCommandArray = shellCommands instanceof Array ? shellCommands : [ shellCommands ];
    const shellCommandLine = shellCommandArray.join(' && ');

    return new Promise((resolve, reject) => {
      exec(shellCommandLine, {
        cwd: process.cwd(),
      }, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          reject(stderr);
          return;
        }
        console.log(`stdout: ${stdout}`);
        resolve(stdout);
      });
    });
  }
}
