function filterType(type, defaultValue) {
  return {
    lowpass: "lowpass",
    highpass: "highpass",
    bandpass: "bandpass",
    lowshelf: "lowshelf",
    highshelf: "highshelf",
    peaking: "peaking",
    notch: "notch",
    allpass: "allpass",
    lpf: "lowpass",
    hpf: "highpass",
    bpf: "bandpass",
    apf: "allpass"
  }[String(type).toLowerCase()] || defaultValue;
}

function audioNode(node, defaultValue) {
  if (node instanceof global.AudioNode) {
    return node;
  }
  if (typeof node === "number" && isFinite(node)) {
    return node;
  }
  return defaultValue;
}

function setAudioParam(audioParam, value) {
  if (typeof value === "number") {
    audioParam.value = value;
  } else {
    audioParam.value = 0;
    value.connect(audioParam);
  }
}

export default { filterType, audioNode, setAudioParam };
