#!/usr/bin/env node

import {program} from "commander";
import { CommandLoader } from "../commands";

const packageJson = require("../package.json")

const bootstrap = () => {
  program.version(
    packageJson.version,
    '-v --version',
    'Output the current version'
  );

  CommandLoader.load(program);
  program.parse(process.argv)
  
  if (!program.args.length) {
  	program.outputHelp();
  }
 }


 bootstrap()