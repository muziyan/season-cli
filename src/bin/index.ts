#!/usr/bin/env node

import {program} from "commander";
import { Command } from 'commander/typings/index';
import { CommandLoader } from "../commands";
import {resolve} from "path"

const packageJson = require(resolve(__dirname,'../../package.json'))

const bootstrap = () => {
  program.version(
    packageJson.version,
    '-v --version',
    'Output the current version'
  );

  CommandLoader.load(program as Command);
  program.parse(process.argv)
  if (!program.args?.length) {
  	program.outputHelp();
  }
 }


 bootstrap()