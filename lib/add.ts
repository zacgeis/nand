import { Circuit } from './circuit';
import { adder } from '../lib/gates';
import { numToBin, binToWires, wiresToNum } from '../lib/bridge';

export function add(a: number, b: number): number {
  let in1 = Wire.bundle(8);
  let in2 = Wire.bundle(8);
  let carry = new Wire();
  let sum = Wire.bundle(8);

  adder(c, in1, in2, carry, sum);

  binToWires(c, numToBin(a), in1);
  binToWires(c, numToBin(b), in2);

  return wiresToNum(c, sum);
}
