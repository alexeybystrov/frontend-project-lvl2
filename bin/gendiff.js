#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';


program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => console.log(genDiff(first, second)))
  .parse(process.argv);
