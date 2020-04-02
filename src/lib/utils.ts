import { exec } from 'child_process';

/*export const execShell = (shellCommands:string | Array<string> = 'pwd') => {
  const shellCommandArray = shellCommands instanceof Array ? shellCommands : [ shellCommands ];
  const shellCommandLine = shellCommandArray.join(' && ');

  return new Promise((resolve, reject) => {
    exec(shellCommandLine, {
      cwd: this.config.baseDir,
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
}*/
