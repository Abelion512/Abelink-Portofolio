const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`
<!DOCTYPE html>
<body>
  <div class="floating-orb"></div>
  <div class="floating-orb"></div>
  <div class="floating-orb"></div>
  <div class="floating-orb"></div>
</body>
`);

const { document, window } = dom.window;
global.document = document;
global.window = window;
global.HTMLElement = window.HTMLElement;

const ITERATIONS = 10000;

function inefficientHandler() {
  const orbs = document.querySelectorAll('.floating-orb');
  const mouseX = 0.5;
  const mouseY = 0.5;

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.5;
    const x = (mouseX - 0.5) * speed * 50;
    const y = (mouseY - 0.5) * speed * 50;

    if (orb instanceof HTMLElement) {
      orb.style.transform = `translate(${x}px, ${y}px)`;
    }
  });
}

function createEfficientHandler() {
  const orbs = document.querySelectorAll('.floating-orb');

  return function efficientHandler() {
    const mouseX = 0.5;
    const mouseY = 0.5;

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.5;
      const x = (mouseX - 0.5) * speed * 50;
      const y = (mouseY - 0.5) * speed * 50;

      if (orb instanceof HTMLElement) {
        orb.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
  }
}

const efficientHandler = createEfficientHandler();

console.log(`Running benchmark with ${ITERATIONS} iterations...`);

// Warmup
for (let i = 0; i < 100; i++) inefficientHandler();
for (let i = 0; i < 100; i++) efficientHandler();

const startInefficient = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  inefficientHandler();
}
const endInefficient = performance.now();
const timeInefficient = endInefficient - startInefficient;

const startEfficient = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  efficientHandler();
}
const endEfficient = performance.now();
const timeEfficient = endEfficient - startEfficient;

console.log(`Inefficient (Query every time): ${timeInefficient.toFixed(2)}ms`);
console.log(`Efficient (Cached Query):       ${timeEfficient.toFixed(2)}ms`);
console.log(`Improvement:                    ${(timeInefficient / timeEfficient).toFixed(2)}x faster`);
