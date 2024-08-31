// Global state object
let state = {
  numLines: 10,
  numSegments: 1,
  segmentLength: 20,
  gap: 5,
  flowSpeed: 0.001,
  noiseScale: 0.001,
  frameSize: 50,
};

// Color settings in hex
const colors = {
  bg: "#282828",
  line: "#FFFF00",
  outline: "#FFFFFF",
};

function setup() {
  const controlPanelWidth =
    document.getElementById("control-container").offsetWidth;
  const canvasWidth = windowWidth - controlPanelWidth - 40;
  const canvasHeight = windowHeight - 20;

  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch-container");

  strokeWeight(2);

  // Initialize controls with current state
  Object.keys(state).forEach((key) => updateControlValue(key, state[key]));

  adjustParameters();
}

function windowResized() {
  const controlPanelWidth =
    document.getElementById("control-container").offsetWidth;
  const canvasWidth = windowWidth - controlPanelWidth - 40;
  const canvasHeight = windowHeight - 20;
  resizeCanvas(canvasWidth, canvasHeight);
  adjustParameters();
}

function draw() {
  background(colors.bg);

  // Draw static white outline
  noFill();
  stroke(colors.outline);
  strokeWeight(4);
  rect(0, 0, width, height);

  let lineSpacing = (width - state.frameSize) / (state.numLines + 1);

  stroke(colors.line);

  for (let i = 1; i <= state.numLines; i++) {
    let x = state.frameSize / 2 + lineSpacing * i;
    drawLineSegments(x, i);
  }
}

function drawLineSegments(x, lineIndex) {
  const segmentSpacing = (height - state.frameSize) / (state.numSegments + 1);

  for (let j = 1; j <= state.numSegments; j++) {
    let y1 = state.frameSize / 2 + segmentSpacing * j;
    let angle =
      noise(
        x * state.noiseScale,
        y1 * state.noiseScale,
        frameCount * state.flowSpeed
      ) * TWO_PI;

    let x2 = x + state.segmentLength * cos(angle);
    let y2_rotated = y1 + state.segmentLength * sin(angle);

    x2 = constrain(x2, state.frameSize / 2, width - state.frameSize / 2);
    y2_rotated = constrain(
      y2_rotated,
      state.frameSize / 2,
      height - state.frameSize / 2
    );

    line(x, y1, x2, y2_rotated);
  }
}

function adjustParameters() {
  const availableWidth = width - state.frameSize;
  const availableHeight = height - state.frameSize;

  state.segmentLength = min(
    state.segmentLength,
    availableWidth / 2 - state.gap
  );
  state.gap = constrain(
    state.gap,
    0,
    availableHeight / state.numSegments - state.segmentLength
  );

  if ((state.segmentLength + state.gap) * state.numSegments > availableHeight) {
    state.segmentLength = availableHeight / state.numSegments - state.gap;
  }

  // Update control panel to reflect adjusted values
  updateControlValue("segmentLength", state.segmentLength);
  updateControlValue("gap", state.gap);
}

function updateState(key, value) {
  state[key] = Number(value);
  adjustParameters();
  updateControlValue(key, state[key]);
}

function updateControlValue(key, value) {
  const slider = document.getElementById(key);
  const manual = document.getElementById(`${key}Manual`);
  const displayValue = document.getElementById(`${key}Value`);

  if (slider && manual && displayValue) {
    slider.value = value;
    manual.value = value;
    displayValue.textContent = value;
  }
}
