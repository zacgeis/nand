## NAND

Understanding the power of NAND.

### Gate support

- nand
- and
- xor
- not
- or
- nor
- srlatch
- halfadder
- fulladder

### Example

```javascript
function add(a, b) {
  var c = new Circuit();

  var in1 = c.wires(8);
  var in2 = c.wires(8);
  var carry = c.wire();
  var sum = c.wires(8);

  compose.adder(c, in1, in2, carry, sum);

  compose.binToWires(c, compose.numToBin(a), in1);
  compose.binToWires(c, compose.numToBin(b), in2);

  return compose.wiresToNum(c, sum);
}

add(12, 14) // => 26
```
