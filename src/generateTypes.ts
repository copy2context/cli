import logger from './logMessages';

const flatten = require('flat');
const prettier = require('prettier');
const fs = require('fs');

export const generateTypes = (outputDir: string, copyObject: Object) => {
  const typesFile = `${outputDir}/types.ts`;
  const flat = flatten(copyObject);
  const keyPaths = Object.keys(flat)
    .map(key => `"${key}"`)
    .join(' | ');

  const content = `export type CopyKeys = ${keyPaths}`;
  fs.writeFile(typesFile, content, 'utf8', (error: any) => {
    if (error) return logger.error(error);
    const text = fs.readFileSync(typesFile, 'utf8');
    const formatted = prettier.format(text, { parser: 'typescript' });
    fs.writeFile(typesFile, formatted, 'utf8', (error: any) => {
      if (error) return logger.error(`Error formatting ${error}`);
      logger.success(`Succesfully written types to ${typesFile}`);
    });
  });
};
