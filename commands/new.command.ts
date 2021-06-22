import { Command } from "commander";
import { AbstractCommand } from "./abstract.command";
import { Input } from "./command.input";

interface NewCommandInterface{
  directory:string
}

export class NewCommand extends AbstractCommand{
  public load(program:Command):void{
    // console.log(program)
    program
      .command('new [project-name]')
      .alias('n')
      .description('create a new project according to you select template')
      .option('--directory [directory]', 'Specify the destination directory')
      .action(async (name:string,command:NewCommandInterface) => {
        const options:Input[] = [];
        options.push({name:"directory",value: command?.directory})

        const inputs: Input[] = [];
        inputs.push({name:"name", value : name});

        await this.action.handle(inputs,options);
      })  
  }
}



