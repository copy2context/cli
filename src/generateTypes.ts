import logger from './logMessages';

import flatten from 'flat';
import prettier from 'prettier';
import fs from 'fs';

export const makeTypes = (copyObject: object) => {
  const keyPaths = Object.keys(flatten(copyObject))
    .map((key: string) => `"${key}"`)
    .join(' | ');

  const content = `export type CopyKeys = ${keyPaths}`;
  return prettier.format(content, { parser: 'typescript' });
};

export const generateTypes = (outputDir: string, copyObject: Object) => {
  const typesFile = `${outputDir}/types.ts`;
  const formatted = makeTypes(copyObject);

  fs.writeFile(typesFile, formatted, 'utf8', err => {
    if (err) return logger.error(err.name);
    logger.success(`Succesfully written types to ${typesFile}`);
  });
};
