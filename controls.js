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
  // ... other presets ...
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
      state[control.id]
    }</span>`;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.id = control.id;
    slider.min = control.min;
    slider.max = control.max;
    slider.step = control.step;
    slider.value = state[control.id];

    const numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.id = `${control.id}Manual`;
    numberInput.value = state[control.id];
    numberInput.step = control.step;

    controlGroup.appendChild(label);
    controlGroup.appendChild(slider);
    controlGroup.appendChild(numberInput);

    controlPanel.appendChild(controlGroup);

    slider.addEventListener("input", () =>
      updateState(control.id, slider.value)
    );
    numberInput.addEventListener("input", () =>
      updateState(control.id, numberInput.value)
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

function resetValues() {
  Object.entries(defaultValues).forEach(([id, value]) => {
    updateState(id, value);
  });
}

function logCurrentValues() {
  console.log(JSON.stringify(state, null, 2));
}

function applyPreset(presetName) {
  const preset = presets[presetName];
  Object.entries(preset).forEach(([id, value]) => {
    updateState(id, value);
  });
}

// Initialize the control panels
generateControlPanel();
generatePresetPanel(); // Assuming this function remains unchanged
