import { generatePrompt } from './utils/generatePrompt';
import { generateSelect, generateInput } from './utils/questions';
import { Input } from "../commands";
import { AbstractAction } from "./abstract.action";
import { existsSync} from "fs"
import { cwd } from 'process';
import * as fs from "fs/promises"
import {resolve} from "path"

const _resolve = (dir:string) => resolve(__dirname,dir)

export class NewAction extends AbstractAction{
  public async handle(inputs: Input[],options: Input[]){

    // get application name 
    const applicationName = getApplicationNameInput(inputs);

    // get project name
    const {projectName} = await askForInputProjectName(applicationName?.value as string) || {}

    const {template} = await askForSelectorTemplate() || {};

    await generateTemplate(projectName,template)

    process.exit(0) 
  }
}

// get application name input
const getApplicationNameInput = (inputs:Input[]):Input | undefined => inputs.find(input => input.name === 'name');

// input project name
const askForInputProjectName = async (projectName?:string ):Promise<any> => {
  const prompt = generatePrompt()
  const message = "project name!"
  const questions = [
    generateInput("projectName")(message)(projectName || "season-demo")
  ]
  return await prompt(questions)
}

// select project template 
const askForSelectorTemplate = async ():Promise<any> => {
  const fileList:string[] = ['none'].concat(await fs.readdir(_resolve("../templates")));
  const prompt = generatePrompt()
  const message = "Please select the template you want to use ?"
  const questions = [
    generateSelect("template")(message)(fileList)
  ]
  return await prompt(questions);
}

// generate template
const generateTemplate = async (projectName:string,template:string) => {
  if(template === 'none') return;
  const targetPath = `${cwd()}/${projectName}`
  if(existsSync(targetPath)) throw new Error("The current directory already exists!")
  await fs.mkdir(targetPath)
  const templateUrl = _resolve(`../templates/${template}`)
  await copy(templateUrl,targetPath)
}

// copy dir to target path
const copy = async (copyPath:string,targetPath:string) => {
  const files = await fs.readdir(copyPath);
  for(let i = 0; i < files.length; i++){
    const filePath = `${copyPath}/${files[i]}`
    const targetDirPath = `${targetPath}/${files[i]}`
    const stat = await fs.stat(filePath);
    if(await stat.isDirectory()){
      await fs.mkdir(targetDirPath)
      await copy(filePath,targetDirPath)
    }else{
      await fs.copyFile(filePath,targetDirPath)
    }
  }
}