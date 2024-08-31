let numLines = 100;
let numSegments = 50;
let segmentLength = 70;
let gap = 1;
let flowSpeed = 0.001;
let noiseScale = 0.001;

const defaultValues = {
  numLines: 100,
  numSegments: 50,
  segmentLength: 70,
  gap: 1,
  flowSpeed: 0.001,
  noiseScale: 0.001,
};

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("sketch-container");

  stroke(255, 255, 0);
  strokeWeight(2);

  setupControlPanel();
}

function draw() {
  background(40, 40, 40);

  let lineSpacing = width / (numLines + 1);

  for (let i = 1; i <= numLines; i++) {
    let x = lineSpacing * i;
    drawLineSegments(x, i);
  }
}

function drawLineSegments(x, lineIndex) {
  for (let j = 0; j < numSegments; j++) {
    let y1 = j * (segmentLength + gap);
    let y2 = y1 + segmentLength;

    let angle =
      noise(x * noiseScale, y1 * noiseScale, frameCount * flowSpeed) * TWO_PI;

    let x2 = x + segmentLength * cos(angle);
    let y2_rotated = y1 + segmentLength * sin(angle);

    line(x, y1, x2, y2_rotated);
  }
}

function setupControlPanel() {
  const controls = [
    { id: "numLines", min: 0, max: 150, step: 1 },
    { id: "numSegments", min: 1, max: 50, step: 1 },
    { id: "segmentLength", min: 0, max: 100, step: 1 },
    { id: "gap", min: 0, max: 30, step: 1 },
    { id: "flowSpeed", min: 0.0001, max: 0.01, step: 0.0001 },
    { id: "noiseScale", min: 0.0005, max: 0.01, step: 0.0001 },
  ];

  controls.forEach((control) => {
    const slider = document.getElementById(control.id);
    const manual = document.getElementById(`${control.id}Manual`);
    const value = document.getElementById(`${control.id}Value`);

    slider.addEventListener("input", () =>
      updateValue(control.id, slider.value)
    );
    manual.addEventListener("input", () =>
      updateValue(control.id, manual.value)
    );
  });

  document
    .getElementById("reset-button")
    .addEventListener("click", resetValues);

  document
    .getElementById("log-button")
    .addEventListener("click", logCurrentValues);
}

function logCurrentValues() {
  console.log(`let numLines = ${numLines};`);
  console.log(`let numSegments = ${numSegments};`);
  console.log(`let segmentLength = ${segmentLength};`);
  console.log(`let gap = ${gap};`);
  console.log(`let flowSpeed = ${flowSpeed};`);
  console.log(`let noiseScale = ${noiseScale};`);
}

function updateValue(id, newValue) {
  newValue = parseFloat(newValue);

  // Update the variable directly
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
  }

  // Update UI elements
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
