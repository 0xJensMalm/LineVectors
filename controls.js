const defaultValues = {
  numLines: 100,
  numSegments: 50,
  segmentLength: 70,
  gap: 1,
  flowSpeed: 0.001,
  noiseScale: 0.001,
  frameSize: 50,
};

const presets = {
  tight_noise: {
    numLines: 100,
    numSegments: 50,
    segmentLength: 19,
    gap: 2,
    flowSpeed: 0.0017,
    noiseScale: 0.0021,
    frameSize: 50,
  },
  placeholder_1: {
    numLines: 100,
    numSegments: 50,
    segmentLength: 19,
    gap: 2,
    flowSpeed: 0.0017,
    noiseScale: 0.0021,
    frameSize: 50,
  },
  placeholder_2: {
    numLines: 100,
    numSegments: 50,
    segmentLength: 19,
    gap: 2,
    flowSpeed: 0.0017,
    noiseScale: 0.0021,
    frameSize: 50,
  },
};

function generateControlPanel() {
  const controlContainer = document.getElementById("control-container");

  const controlPanel = document.createElement("div");
  controlPanel.classList.add("control-panel");

  const controls = [
    { id: "numLines", min: 0, max: 150, step: 1, label: "Lines" },
    { id: "numSegments", min: 1, max: 50, step: 1, label: "Segments" },
    { id: "segmentLength", min: 0, max: 100, step: 1, label: "Length" },
    { id: "gap", min: 0, max: 30, step: 1, label: "Gap" },
    { id: "flowSpeed", min: 0.0001, max: 0.01, step: 0.0001, label: "Flow" },
    { id: "noiseScale", min: 0.0005, max: 0.01, step: 0.0001, label: "Noise" },
    { id: "frameSize", min: 0, max: 100, step: 1, label: "Frame Size" },
  ];

  controls.forEach((control) => {
    const controlGroup = document.createElement("div");
    controlGroup.classList.add("control-group");

    const label = document.createElement("label");
    label.setAttribute("for", control.id);
    label.innerHTML = `${control.label}: <span id="${control.id}Value">${
      defaultValues[control.id]
    }</span>`;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.id = control.id;
    slider.min = control.min;
    slider.max = control.max;
    slider.step = control.step;
    slider.value = defaultValues[control.id];

    const numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.id = `${control.id}Manual`;
    numberInput.value = defaultValues[control.id];
    numberInput.step = control.step;

    controlGroup.appendChild(label);
    controlGroup.appendChild(slider);
    controlGroup.appendChild(numberInput);

    controlPanel.appendChild(controlGroup);

    slider.addEventListener("input", () =>
      updateValue(control.id, slider.value)
    );
    numberInput.addEventListener("input", () =>
      updateValue(control.id, numberInput.value)
    );
  });

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("button-group");

  const resetButton = document.createElement("button");
  resetButton.id = "reset-button";
  resetButton.classList.add("small-button");
  resetButton.textContent = "Reset";

  const logButton = document.createElement("button");
  logButton.id = "log-button";
  logButton.classList.add("small-button");
  logButton.textContent = "Log";

  buttonGroup.appendChild(resetButton);
  buttonGroup.appendChild(logButton);

  controlPanel.appendChild(buttonGroup);

  controlContainer.appendChild(controlPanel);

  resetButton.addEventListener("click", resetValues);
  logButton.addEventListener("click", logCurrentValues);
}

function generatePresetPanel() {
  const controlContainer = document.getElementById("control-container");

  const presetPanel = document.createElement("div");
  presetPanel.classList.add("control-panel");

  const title = document.createElement("h3");
  title.textContent = "Presets";
  presetPanel.appendChild(title);

  Object.keys(presets).forEach((preset) => {
    const button = document.createElement("button");
    button.classList.add("preset-button");
    button.textContent = preset.replace(/_/g, " ");
    button.addEventListener("click", () => applyPreset(preset));
    presetPanel.appendChild(button);
  });

  controlContainer.appendChild(presetPanel);
}

function updateValue(id, newValue) {
  newValue = parseFloat(newValue);

  switch (id) {
    case "numLines":
      numLines = newValue;
      break;
    case "numSegments":
      numSegments = newValue;
      break;
    case "segmentLength":
      segmentLength = newValue;
      break;
    case "gap":
      gap = newValue;
      break;
    case "flowSpeed":
      flowSpeed = newValue;
      break;
    case "noiseScale":
      noiseScale = newValue;
      break;
    case "frameSize":
      frameSize = newValue;
      break;
  }

  const slider = document.getElementById(id);
  const manual = document.getElementById(`${id}Manual`);
  const value = document.getElementById(`${id}Value`);

  slider.value = newValue;
  manual.value = newValue;
  value.textContent = newValue;
}

function resetValues() {
  Object.entries(defaultValues).forEach(([id, value]) => {
    updateValue(id, value);
  });
}

function logCurrentValues() {
  console.log(`let numLines = ${numLines};`);
  console.log(`let numSegments = ${numSegments};`);
  console.log(`let segmentLength = ${segmentLength};`);
  console.log(`let gap = ${gap};`);
  console.log(`let flowSpeed = ${flowSpeed};`);
  console.log(`let noiseScale = ${noiseScale};`);
  console.log(`let frameSize = ${frameSize};`);
}

function applyPreset(presetName) {
  const preset = presets[presetName];
  Object.entries(preset).forEach(([id, value]) => {
    updateValue(id, value);
  });
}

// Initialize the control panels
generateControlPanel();
generatePresetPanel();
