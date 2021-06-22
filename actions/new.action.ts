import { generateSelect } from './../libs/utils/questions';
import { Input } from "../commands";
import { AbstractAction } from "./abstract.action";
import * as inquirer from "inquirer"


const STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);
const decamelize = (str:string):string => str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();

export class NewAction extends AbstractAction{
  public async handle(inputs: Input[],options: Input[]){

    // Determine whether the project directory exists
    const directoryOption = options.find(option => option.name === 'directory');

    // get application name 
    const applicationName = getApplicationNameInput(inputs);

    // project directory
    const projectDirectory = getProjectDirectory(applicationName!,directoryOption);

    const {template} = await askForSelectorTemplate(applicationName);

    process.exit(0)
  }
}

const getApplicationNameInput = (inputs:Input[]):Input | undefined => inputs.find(input => input.name === 'name');

const getProjectDirectory = (
  applicationName:Input,
  directoryOption?:Input
): string => {
  return (
    (directoryOption?.value as string) || decamelize(applicationName?.value as string || "")
  )
}



const askForSelectorTemplate = async (applicationName:Input | undefined):Promise<any> => {
  if(!applicationName?.value){
    const prompt:inquirer.PromptModule = inquirer.createPromptModule();
    const message = "Please select the template you want to use ?"
    const questions:inquirer.Question[] = [
      generateSelect("template")(message)([
        'none',
        'vue3'
      ])
    ]
    return await prompt(questions);
  }
}