import { Circuit } from './circuit';
import { adder } from '../lib/gates';
import { numToBin, binToWires, wiresToNum } from '../lib/bridge';

export function add(a: number, b: number): number {
  let c = new Circuit();

  let in1 = c.wires(8);
  let in2 = c.wires(8);
  let carry = c.wire();
  let sum = c.wires(8);

  adder(c, in1, in2, carry, sum);

  binToWires(c, numToBin(a), in1);
  binToWires(c, numToBin(b), in2);

  return wiresToNum(c, sum);
}
