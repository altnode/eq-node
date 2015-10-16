# altnode.EQNode
[![Build Status](http://img.shields.io/travis/altnode/eq-node.svg?style=flat-square)](https://travis-ci.org/altnode/eq-node)
[![NPM Version](http://img.shields.io/npm/v/altnode.eq-node.svg?style=flat-square)](https://www.npmjs.org/package/altnode.eq-node)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

## Installation

```
npm install -S altnode.eq-node
```

## API
### AudioNode
- `constructor(audioContext: AudioContext, paramsList: object[])`

#### Instance methods
- `getAllFilters(): BiquadFilterNode[]`
- `getFilterAtIndex(index: number): BiquadFilterNode`
- `getFilterById(id: string): BiquadFilterNode`

## Example

```js
import EQNode from "altnode.eq-node";

let audioContext = new AudioContext();
let bufSrc = audioContext.createBufferSource();
let eq = new EQNode(audioContext, [
  { frequency: 400, Q: 12, gain: 10 },
  { frequency: 800, Q: 16, gain: 20 },
  { id: "foo", frequency: 1200, Q: 14, gain: 30 },
  { id: "bar", frequency: 1600, Q: 12, gain: 20 },
  { type: "highpass", frequency: 200, Q: 0.9 },
  { type: "lowpass", frequency: 3200, Q: 3 }
]);

bufSrc.buffer = RhythmLoop;
bufSrc.loop = true;
bufSrc.start();
bufSrc.connect(eq);

eq.connect(audioContext.destination);
```

## LICENSE
MIT
