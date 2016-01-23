var comps = {};
var compCount = 0;

function wire() {
  var comp = {
    type: 'wire',
    id: compCount++,
    input: [],
    output: [],
    state: false
  };
  comps[comp.id] = comp;
  return comp;
}

var TRUE = wire();
TRUE.state = true;

var FALSE = wire();
TRUE.state = false;

function nand(in1, in2, out1) {
  var comp = {
    type: 'nand',
    id: compCount++,
    input: [in1.id, in2.id],
    output: [out1.id],
    state: false
  };

  in1.output.push(comp.id);
  in2.output.push(comp.id);
  out1.input.push(comp.id);

  comps[comp.id] = comp;
  return comp;
}

function propogate(comp) {
  var nextPending = [];
  var pending = comp.output;

  while(pending.length > 0) {
    for(var i = 0; i < pending.length; i++) {
      var pendingComp = comps[pending[i]];
      nextPending = nextPending.concat(pendingComp.output);
      if(pendingComp.type === 'wire') {
        // assumes wire only has a single input
        pendingComp.state = comps[pendingComp.input[0]].state;
      }
      if(pendingComp.type === 'nand') {
        // assumes nand only has two inputs
        var t1 = comps[pendingComp.input[0]].state;
        var t2 = comps[pendingComp.input[1]].state;
        pendingComp.state = !(t1 && t2);
      }
    }
    pending = nextPending;
    nextPending = [];
  }
}

function on(comp) {
  comp.state = true;
  propogate(comp);
}

function off(comp) {
  comp.state = false;
  propogate(comp);
}

function state(comp) {
  return comp.state;
}

function expect(message, expectedValue, actualValue) {
  if(expectedValue !== actualValue) {
    console.log(message, ' actual value: ', actualValue, ' expected: ', expectedValue);
  }
}

function or(in1, in2, out1) {
  var a = wire();
  var b = wire();

  nand(in1, in1, a);
  nand(in2, in2, b);
  nand(a, b, out1);
}

function nor(in1, in2, out1) {
  var a = wire();
  var b = wire();
  var c = wire();

  nand(in1, in1, a);
  nand(in2, in2, b);
  nand(a, b, c);
  nand(c, c, out1);
}

function testNand() {
  var a = wire();
  var b = wire();
  var c = wire();

  nand(a, b, c);

  expect('should state at false', false, state(c));

  on(a);
  expect('a being on should cause c to be true', true, state(c));

  on(b);
  expect('a and b being on should cause c to be false', false, state(c));
}

function testMassiveOr() {
  var a = wire();
  var c;

  for(var i = 0; i < 1000; i++) {
    c = wire();
    or(a, a, c);
    a = c;
  }

  on(a);
  console.log(state(c));

  off(a);
  console.log(state(c));
}


function testLatch() {
  var a = wire();
  var b = wire();
  var c = wire();

  nor(a, b, c);

  // cycle everything on or off

  off(a);
  console.log(state(c));

  off(b);
  console.log(state(c));

  on(a);
  console.log(state(c));
}

//testNand();
//testMassiveOr();
testLatch();
