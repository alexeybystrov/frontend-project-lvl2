#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';


program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'nested')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => console.log(genDiff(first, second, program.format)))
  .parse(process.argv);
