let numLines = 10; // Initial number of lines
let numSegments = 1; // Initial number of segments per line
let segmentLength = 20; // Initial segment length
let gap = 5; // Initial gap between segments
let flowSpeed = 0.001;
let noiseScale = 0.001;
let frameSize = 50; // Frame size around the canvas

function setup() {
  // Calculate canvas size
  const controlPanelWidth =
    document.getElementById("control-container").offsetWidth;
  const canvasWidth = windowWidth - controlPanelWidth - 40; // 40px padding/margin
  const canvasHeight = windowHeight - 20; // 20px padding/margin

  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch-container");

  stroke(255, 255, 0);
  strokeWeight(2);

  adjustParameters(); // Adjust parameters based on canvas size
}

function windowResized() {
  const controlPanelWidth =
    document.getElementById("control-container").offsetWidth;
  const canvasWidth = windowWidth - controlPanelWidth - 40; // 40px padding/margin
  const canvasHeight = windowHeight - 20; // 20px padding/margin
  resizeCanvas(canvasWidth, canvasHeight);
  adjustParameters(); // Re-adjust parameters when the window is resized
}

function draw() {
  background(40, 40, 40);

  // Draw frame
  noFill();
  stroke(200);
  strokeWeight(2);
  rect(frameSize / 2, frameSize / 2, width - frameSize, height - frameSize);

  let lineSpacing = (width - frameSize) / (numLines + 1);

  for (let i = 1; i <= numLines; i++) {
    let x = frameSize / 2 + lineSpacing * i;
    drawLineSegments(x, i);
  }
}

function drawLineSegments(x, lineIndex) {
  const segmentSpacing = (height - frameSize) / (numSegments + 1);

  for (let j = 1; j <= numSegments; j++) {
    let y1 = frameSize / 2 + segmentSpacing * j;
    let angle =
      noise(x * noiseScale, y1 * noiseScale, frameCount * flowSpeed) * TWO_PI;

    let x2 = x + segmentLength * cos(angle);
    let y2_rotated = y1 + segmentLength * sin(angle);

    // Ensure the line segment stays within the frame
    x2 = constrain(x2, frameSize / 2, width - frameSize / 2);
    y2_rotated = constrain(y2_rotated, frameSize / 2, height - frameSize / 2);

    line(x, y1, x2, y2_rotated);
  }
}

function adjustParameters() {
  // Logic to constrain and adjust parameters based on available canvas size
  const availableWidth = width - frameSize;
  const availableHeight = height - frameSize;

  // Dynamically adjust segment length to ensure it fits within the width
  segmentLength = min(segmentLength, availableWidth / 2 - gap);

  // Adjust gap dynamically if needed
  gap = constrain(gap, 0, availableHeight / numSegments - segmentLength);

  // Adjust segmentLength if it overflows the available height
  if ((segmentLength + gap) * numSegments > availableHeight) {
    segmentLength = availableHeight / numSegments - gap;
  }
}
