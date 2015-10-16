import AltAudioNode from "altnode.alt-audio-node";
import _first from "lodash.first";
import _last from "lodash.last";
import { filterType, audioNode, setAudioParam } from "./utils";
import { FILTERS, ID_MAP } from "./symbols";

export default class EQNode extends AltAudioNode {
  constructor(audioContext, paramList) {
    super(audioContext);

    if (!Array.isArray(paramList) || paramList.length === 0) {
      paramList = [ {} ];
    }

    this[ID_MAP] = {};
    this[FILTERS] = new Array(paramList.length);

    paramList.forEach(({ id, type, frequency, detune, Q, gain }, index) => {
      let filter = audioContext.createBiquadFilter();

      filter.type = filterType(type, "peaking");

      setAudioParam(filter.frequency, audioNode(frequency, 350));
      setAudioParam(filter.detune, audioNode(detune, 0));
      setAudioParam(filter.Q, audioNode(Q, 1));
      setAudioParam(filter.gain, audioNode(gain, 0));

      if (typeof id !== "undefined") {
        this[ID_MAP][id] = filter;
      }

      this[FILTERS][index] = filter;
    });

    for (let i = 0, imax = this[FILTERS].length - 1; i < imax; i++) {
      this[FILTERS][i].connect(this[FILTERS][i + 1]);
    }
  }

  getAllFilters() {
    return this[FILTERS].slice();
  }

  getFilterAtIndex(index) {
    return this[FILTERS][index] || null;
  }

  getFilterById(id) {
    return this[ID_MAP][id] || null;
  }

  connect(...args) {
    _last(this[FILTERS]).connect(...args);
  }

  disconnect(...args) {
    _last(this[FILTERS]).disconnect(...args);
  }

  dispose() {
    this[FILTERS].forEach((filter) => {
      filter.disconnect();
    });
    this[FILTERS] = null;
    this[ID_MAP] = null;
  }

  __connectFrom(source, ...args) {
    source.connect(_first(this[FILTERS]), ...args);
  }
}
