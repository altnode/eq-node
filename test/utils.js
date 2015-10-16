import assert from "power-assert";
import { filterType, audioNode, setAudioParam } from "../src/utils";

describe("utils", () => {
  describe("filterType(type: string, defaultValue: string): string", () => {
    it("works", () => {
      assert(filterType("lowpass", "peaking") === "lowpass");
      assert(filterType("highpass", "peaking") === "highpass");
      assert(filterType("bandpass", "peaking") === "bandpass");
      assert(filterType("lowshelf", "peaking") === "lowshelf");
      assert(filterType("highshelf", "peaking") === "highshelf");
      assert(filterType("peaking", "peaking") === "peaking");
      assert(filterType("notch", "peaking") === "notch");
      assert(filterType("allpass", "peaking") === "allpass");
      assert(filterType("lpf", "peaking") === "lowpass");
      assert(filterType("hpf", "peaking") === "highpass");
      assert(filterType("bpf", "peaking") === "bandpass");
      assert(filterType("notch", "peaking") === "notch");
      assert(filterType("apf", "peaking") === "allpass");
      assert(filterType("unknown", "peaking") === "peaking");
    });
  });
  describe("audioNode(node: AudioNode|number, defaultValue: number): AudioNode|number", () => {
    it("works", () => {
      assert(audioNode(0, 350) === 0);
      assert(audioNode(Infinity, 350) === 350);
      assert(audioNode(NaN, 350) === 350);

      let audioContext = new global.AudioContext();
      let gainNode = audioContext.createGain();

      assert(audioNode(gainNode, 350) === gainNode);
    });
  });
  describe("setAudioParam(audioParam: AudioParam, value: AudioNode|number): void", () => {
    it("works with number", () => {
      let audioContext = new global.AudioContext();
      let gainNode = audioContext.createGain();

      setAudioParam(gainNode.gain, 0.5);

      assert(gainNode.gain.value === 0.5);
    });
    it("works with AudioNode", () => {
      let audioContext = new global.AudioContext();
      let gainNode = audioContext.createGain();
      let oscNode = audioContext.createOscillator();

      setAudioParam(gainNode.gain, oscNode);

      assert(gainNode.gain.value === 0);
      assert(gainNode.gain.$isConnectedFrom(oscNode));
    });
  });
});
