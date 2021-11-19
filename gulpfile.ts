import { existsSync } from 'fs';
import {series, TaskFunctionCallback,dest,watch} from "gulp"
import { stat,mkdir,readdir,copyFile} from "fs/promises";
import * as ts from "gulp-typescript"
import { exec } from "child_process";
import { resolve } from "path";

const _resolve = (dir:string):string => resolve(__dirname,dir)

const tsProject = ts.createProject(_resolve("./tsconfig.json"))
const outputDir = _resolve("./dist");
const templatePath = _resolve("./src/templates")

const clearOutputDir = async (cb:TaskFunctionCallback) => {
  if(existsSync(outputDir)){
    await exec(`rm -rf ${outputDir}`).on('exit',() => {
      cb();
    })
  }else{
    cb()
  }
}

const copyTemplates = async (cb:TaskFunctionCallback) => {
  await createOutputDir()
  const targetPath = `${outputDir}/templates`
  if(!existsSync(targetPath)) await mkdir(targetPath)
  await copyDir(templatePath,targetPath)
  cb()
}

const buildTypescript = async (cb:TaskFunctionCallback) => {
  await createOutputDir()
  tsProject.src().pipe(tsProject()).js.pipe(dest(outputDir))
  cb()
}

const dev = async (cb:TaskFunctionCallback) => {
  buildTypescript(cb)
  watch(_resolve("./src/**/*.ts"),devTypescript)
}

const devTypescript = async (cb:TaskFunctionCallback) => {
  tsProject.src().pipe(tsProject()).js.pipe(dest(outputDir))
  cb();
}

const createOutputDir = async () => {
  if(!existsSync(outputDir)) await mkdir(outputDir)
}

const copyDir = async (copyPath:string,targetPath:string) => {
  const files = await readdir(copyPath);
  for(let i = 0; i < files.length; i++){
    const filePath = `${copyPath}/${files[i]}`
    const targetDirPath = `${targetPath}/${files[i]}`
    const statObj = await stat(filePath);
    if(await statObj.isDirectory()){
      !existsSync(targetDirPath) && await mkdir(targetDirPath)
      await copyDir(filePath,targetDirPath)
    }else{
      await copyFile(filePath,targetDirPath)
    }
  }
}


export const build = series(clearOutputDir,copyTemplates,buildTypescript)

export const start = series(dev)