
import {expect} from "chai";

export const expectBignumberEqual = (
  a: any,
  b: any
) => expect(a.toString()).to.be.equal(b.toString());