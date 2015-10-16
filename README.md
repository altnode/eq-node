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
- `getFilterAtIndex(index: number): BiquadFilterNode`
- `getFilterById(id: string): BiquadFilterNode`
- `getAllFilters(): BiquadFilterNode[]`

## Example

```js
import EQNode from "altnode.eq-node";

let audioContext = new AudioContext();
let bufSrc = audioContext.createBufferSource();
let eq = new EQNode(audioContext, [
  { frequency: 440, Q: 12 },
  { frequency: 880, Q: 18 },
  { frequency: 1000, Q: 6 },
  { frequency: 1200, Q: 4 },
  { type: "highpass", frequency: 120, Q: 1 },
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
