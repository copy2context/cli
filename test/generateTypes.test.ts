import { makeTypes } from '../src/generateTypes';

describe('makeTypes', () => {
  it('works when given a simple copy object', () => {
    expect(makeTypes(basicObject)).toMatch(typesBasic);
  });
  it('works when given a nested copy object', () => {
    expect(makeTypes(nestedObject)).toMatch(typesNested);
  });
  it('works when given an object with multiple keys', () => {
    expect(makeTypes(multiKeys)).toMatch(typesMulti);
  });
});

const basicObject = {
  index: {
    title: 'Welcome to my site',
    welcome: 'Welcome to my site',
  },
};

const typesBasic = `export type CopyKeys = "index.title" | "index.welcome";`;

const nestedObject = {
  index: {
    title: '',
    listItems: {
      one: 'list item one',
      two: 'list item two',
      three: 'list item three',
    },
  },
};

const typesNested = `export type CopyKeys =
  | "index.title"
  | "index.listItems.one"
  | "index.listItems.two"
  | "index.listItems.three";
`;

const multiKeys = {
  index: {
    title: '',
  },
  about: {
    title: '',
  },
};

const typesMulti = `export type CopyKeys = "index.title" | "about.title"`;
