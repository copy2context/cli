#!/usr/bin/env node
import logger from './logMessages';
import { generateTypes } from './generateTypes';

const yaml = require('js-yaml');
const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
const mkdirp = require('mkdirp');

const rootDir = path.resolve('.');

const options = yargs.usage('Usage: -c <config>').option('c', {
  alias: 'config',
  describe: 'Path of config file',
  type: 'string',
  demandOption: true,
}).argv;

const configPath = `${rootDir}/${options.config}`;

fs.access(configPath, fs.F_OK, (err: any) => {
  if (err) {
    logger.error(`Config file does not exist at ${configPath}`);
    return;
  }
  run();
});

const writeFile = async (
  dir: any,
  file: string,
  content: string,
  exportTS = false
) => {
  await mkdirp(dir);
  const fileExt = exportTS ? `ts` : `js`;
  const fileName = `${dir}/${file}.${fileExt}`;

  fs.writeFileSync(fileName, content);
  logger.success(`Succesfully written copy object to ${fileName}`);
};

const convertDirectoriesToArray = (
  data: { [s: string]: unknown } | ArrayLike<unknown>
) => Object.entries(data).map(([key, value]) => ({ file: key, path: value }));

const run = async () => {
  const configObj = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
  const copyDirectories = configObj.copyDirectories;
  const exportTS = configObj.exportTS;

  let outputDir = configObj.ouptutDirectory;
  if (!outputDir) {
    logger.warning(
      'No ouput directory sepecified in config. Defaulting to /copy'
    );

    outputDir = `${rootDir}/copy`;
  }
  if (!copyDirectories) {
    logger.error('No copy directories sepecified in config. Please add');
    process.exit(1);
  }

  try {
    convertDirectoriesToArray(copyDirectories).forEach((dir, index) => {
      let output = {};
      const directory = dir.path;
      fs.readdir(directory, (err: any, files: any[]) => {
        if (err) {
          logger.error(
            `Sorry! Couldn't read files from ${directory}, make sure that you have specified the path correctly in config`
          );

          process.exit(1);
        }

        files.forEach((file: string) => {
          const yamlData = yaml.safeLoad(
            fs.readFileSync(`${directory}/${file}`, 'utf8')
          );
          const prefix = file.split('.')[0];
          const newObject = { [prefix]: yamlData };
          output = { ...output, ...newObject };
        });
        const exportedObject = `const copyStrings = ${JSON.stringify(
          output,
          null,
          4
        )}
        export default copyStrings`;

        writeFile(outputDir, dir.file, exportedObject, exportTS);

        if (exportTS && index === 0) {
          generateTypes(outputDir, output);
        }
      });
    });
  } catch (e) {
    logger.error(e);
  }
};
