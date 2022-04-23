import path from 'path';
import glob from 'glob';
import {expect} from 'chai';

export const requireAllTestsInFolder = (pattern = './test/**/*.test.js') => glob.sync(pattern).forEach(file => {
  // eslint-disable-next-line import/no-dynamic-require
  import(path.resolve(file));
});

export const expectBignumberEqual = (a, b) => expect(a.toString()).to.be.equal(b.toString());
