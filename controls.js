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
  tilework: {
    numLines: 100,
    numSegments: 50,
    segmentLength: 6,
    gap: 2,
    flowSpeed: 0.0037,
    noiseScale: 0.0081,
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

function generateColorControlPanel() {
  const controlContainer = document.getElementById("control-container");

  const colorPanel = document.createElement("div");
  colorPanel.classList.add("control-panel");

  const title = document.createElement("h3");
  title.textContent = "Color Modes";
  colorPanel.appendChild(title);

  const colorModes = ["Standard", "AngleGradient", "Noise"];
  colorModes.forEach((mode, index) => {
    const controlGroup = document.createElement("div");
    controlGroup.classList.add("control-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = `colorMode-${mode}`;
    radio.name = "colorMode";
    radio.value = mode;
    radio.checked = index === 0; // Default to Standard mode

    const label = document.createElement("label");
    label.setAttribute("for", `colorMode-${mode}`);
    label.textContent = mode;

    controlGroup.appendChild(radio);
    controlGroup.appendChild(label);
    colorPanel.appendChild(controlGroup);

    radio.addEventListener("change", () => updateColorMode(mode));
  });

  // Add theme selection buttons for Standard mode
  const themeGroup = document.createElement("div");
  themeGroup.classList.add("control-group");
  themeGroup.id = "theme-group";

  const themes = [
    { id: "theme1", colors: ["#FFFF00", "#FFA500", "#FF4500"] }, // Example theme
    { id: "theme2", colors: ["#00FFFF", "#0000FF", "#8A2BE2"] },
    { id: "theme3", colors: ["#ADFF2F", "#7FFF00", "#32CD32"] },
  ];

  themes.forEach((theme) => {
    const button = document.createElement("button");
    button.classList.add("small-button"); // Use the same styling as the reset/log buttons
    button.style.background = `linear-gradient(to right, ${theme.colors.join(
      ","
    )})`;
    button.addEventListener("click", () => applyTheme(theme.colors));
    themeGroup.appendChild(button);
  });

  colorPanel.appendChild(themeGroup);
  controlContainer.appendChild(colorPanel);

  updateColorMode("Standard"); // Initialize with Standard mode
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

function updateColorMode(mode) {
  // Update global variable for color mode
  colorMode = mode;

  // Show or hide themeGroup based on selected mode
  const themeGroup = document.getElementById("theme-group");
  if (mode === "Standard") {
    themeGroup.style.display = "flex";
  } else {
    themeGroup.style.display = "none";
  }
}

function applyTheme(colors) {
  // Apply the selected theme colors to the lines
  themeColors = colors;
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
  const logString = `
    numLines: ${numLines},
    numSegments: ${numSegments},
    segmentLength: ${segmentLength},
    gap: ${gap},
    flowSpeed: ${flowSpeed},
    noiseScale: ${noiseScale},
    frameSize: ${frameSize},
    `;
  console.log(logString);
}

function applyPreset(presetName) {
  const preset = presets[presetName];
  Object.entries(preset).forEach(([id, value]) => {
    updateValue(id, value);
  });
}

// Initialize all control panels
generateControlPanel();
generatePresetPanel();
generateColorControlPanel();
