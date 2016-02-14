## NAND

Understanding the power of NAND.

### Gate support

- nand
- and
- xor
- not
- or
- nor
- srlatch (stabilizes looped input)
- halfadder
- fulladder
- adder
- inc
- srflipflop
- mux

### Example

```javascript
function add(a, b) {
  var c = new Circuit();

  var in1 = c.wires(8);
  var in2 = c.wires(8);
  var carry = c.wire();
  var sum = c.wires(8);

  gates.adder(c, in1, in2, carry, sum);

  interface.binToWires(c, interface.numToBin(a), in1);
  interface.binToWires(c, interface.numToBin(b), in2);

  return interface.wiresToNum(c, sum);
}

add(12, 14) // => 26
```
