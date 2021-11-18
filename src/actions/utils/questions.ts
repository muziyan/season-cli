import * as inquirer from "inquirer"

export const generateInput = (name:string) => (message:string) => (defaultValue?:string):inquirer.Question => {
  return {
    type:'input',
    message,
    name,
    default(){
      return defaultValue || ""
    }
  }
}
export const generateSelect = (name:string) => (message:string) => (list:Array<Object> | string []) => {
  return {
    type:'list',
    message,
    name,
    choices:list
  }
}