import assert from "power-assert";
import EQNode from "../src/EQNode";
import { FILTERS } from "../src/symbols";

let paramList = [
  { frequency: 400, Q: 12, gain: 10 },
  { frequency: 800, Q: 16, gain: 20 },
  { id: "foo", frequency: 1200, Q: 14, gain: 30 },
  { id: "bar", frequency: 1600, Q: 12, gain: 20 },
  { type: "lpf", frequency: 200, Q: 0.9 }
];

describe("EQNode", () => {
  let audioContext = null;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  describe("constructor(audioContext: AudioContext, paramList: object[])", () => {
    it("works", () => {
      let eq = new EQNode(audioContext, paramList);

      assert(eq instanceof EQNode);
    });
    it("works with invalid argument", () => {
      let eq = new EQNode(audioContext);

      assert(eq instanceof EQNode);
    });
    it("works with empty parameters", () => {
      let eq = new EQNode(audioContext, []);

      assert(eq instanceof EQNode);
    });
  });
  describe("#getAllFilters(): BiquadFilter[]", () => {
    it("works", () => {
      let eq = new EQNode(audioContext, paramList);

      assert(eq.getAllFilters().length === 5);
    });
  });
  describe("#getFilterAtIndex(index: number): BiquadFilter", () => {
    it("works", () => {
      let eq = new EQNode(audioContext, paramList);

      assert(eq.getFilterAtIndex(0) instanceof global.BiquadFilterNode);
      assert(eq.getFilterAtIndex(0).frequency.value === 400);

      assert(eq.getFilterAtIndex(1) instanceof global.BiquadFilterNode);
      assert(eq.getFilterAtIndex(1).frequency.value === 800);

      assert(eq.getFilterAtIndex(100) === null);
    });
  });
  describe("#getFilterById(id: string): BiquadFilter", () => {
    it("works", () => {
      let eq = new EQNode(audioContext, paramList);

      assert(eq.getFilterById("foo") instanceof global.BiquadFilterNode);
      assert(eq.getFilterById("foo").frequency.value === 1200);

      assert(eq.getFilterById("bar") instanceof global.BiquadFilterNode);
      assert(eq.getFilterById("bar").frequency.value === 1600);

      assert(eq.getFilterById("buz") === null);
    });
  });
  describe("#connect(...args): void", () => {
    it("works", () => {
      let eq = new EQNode(audioContext, paramList);

      eq.connect(audioContext.destination);

      assert(audioContext.destination.$isConnectedFrom(eq[FILTERS][4]));
    });
  });
  describe("#disconnect(...args): void", () => {
    it("works", () => {
      let eq = new EQNode(audioContext, paramList);

      eq.connect(audioContext.destination);
      eq.disconnect();

      assert(!audioContext.destination.$isConnectedFrom(eq[FILTERS][4]));
    });
  });
  describe("#dispose(): void", () => {
    it("works", () => {
      let eq = new EQNode(audioContext, paramList);

      eq.dispose();

      assert.throws(() => {
        eq.dispose();
      });
    });
  });
  describe("connected from", () => {
    it("works", () => {
      let oscillator = audioContext.createOscillator();
      let eq = new EQNode(audioContext, paramList);

      oscillator.connect(eq);

      assert(eq[FILTERS][0].$isConnectedFrom(oscillator));
    });
  });
  describe("graph", () => {
    it("works", () => {
      let eq = new EQNode(audioContext, paramList);

      eq.connect(audioContext.destination);

      assert.deepEqual(audioContext.destination.toJSON(), {
        name: "AudioDestinationNode",
        inputs: [
          {
            name: "BiquadFilterNode",
            type: "lowpass",
            frequency: {
              value: 200,
              inputs: []
            },
            detune: {
              value: 0,
              inputs: []
            },
            Q: {
              value: 0.9,
              inputs: []
            },
            gain: {
              value: 0,
              inputs: []
            },
            inputs: [
              {
                name: "BiquadFilterNode",
                type: "peaking",
                frequency: {
                  value: 1600,
                  inputs: []
                },
                detune: {
                  value: 0,
                  inputs: []
                },
                Q: {
                  value: 12,
                  inputs: []
                },
                gain: {
                  value: 20,
                  inputs: []
                },
                inputs: [
                  {
                    name: "BiquadFilterNode",
                    type: "peaking",
                    frequency: {
                      value: 1200,
                      inputs: []
                    },
                    detune: {
                      value: 0,
                      inputs: []
                    },
                    Q: {
                      value: 14,
                      inputs: []
                    },
                    gain: {
                      value: 30,
                      inputs: []
                    },
                    inputs: [
                      {
                        name: "BiquadFilterNode",
                        type: "peaking",
                        frequency: {
                          value: 800,
                          inputs: []
                        },
                        detune: {
                          value: 0,
                          inputs: []
                        },
                        Q: {
                          value: 16,
                          inputs: []
                        },
                        gain: {
                          value: 20,
                          inputs: []
                        },
                        inputs: [
                          {
                            name: "BiquadFilterNode",
                            type: "peaking",
                            frequency: {
                              value: 400,
                              inputs: []
                            },
                            detune: {
                              value: 0,
                              inputs: []
                            },
                            Q: {
                              value: 12,
                              inputs: []
                            },
                            gain: {
                              value: 10,
                              inputs: []
                            },
                            inputs: []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });
    });
  });
});
