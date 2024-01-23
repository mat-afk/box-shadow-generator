class BoxShadowGenerator {
  constructor(
    horizontalRange,
    horizontalReference,
    verticalRange,
    verticalReference,
    blurRange,
    blurReference,
    spreadRange,
    spreadReference,
    shadowColor,
    shadowColorReference,
    boxColor,
    boxColorReference,
    opacityRange,
    opacityReference,
    insetCheckbox,
    previewBox,
    rule,
    webkitRule,
    mozRule
  ) {
    this.horizontalRange = horizontalRange;
    this.horizontalReference = horizontalReference;
    this.verticalRange = verticalRange;
    this.verticalReference = verticalReference;
    this.blurRange = blurRange;
    this.blurReference = blurReference;
    this.spreadRange = spreadRange;
    this.spreadReference = spreadReference;
    this.shadowColor = shadowColor;
    this.shadowColorReference = shadowColorReference;
    this.boxColor = boxColor;
    this.boxColorReference = boxColorReference;
    this.opacityRange = opacityRange;
    this.opacityReference = opacityReference;
    this.insetCheckbox = insetCheckbox;
    this.previewBox = previewBox;
    this.rule = rule;
    this.webkitRule = webkitRule;
    this.mozRule = mozRule;
  }

  initialize() {
    this.horizontalReference.value = this.horizontalRange.value;
    this.verticalReference.value = this.verticalRange.value;
    this.blurReference.value = this.blurRange.value;
    this.spreadReference.value = this.spreadRange.value;
    this.shadowColorReference.value = this.shadowColor.value;
    this.boxColorReference.value = this.boxColor.value;
    this.opacityReference.value = this.opacityRange.value;
    this.insetCheckbox.checked = false;

    this.applyBoxShadow();
    this.showRule();
  }

  applyBoxShadow() {
    const inset = this.insetCheckbox.checked ? "inset" : "";

    const rgba = `rgba(${this.hexToRgb(this.shadowColorReference.value)}, ${
      this.opacityReference.value
    })`;

    this.previewBox.style.boxShadow = `${inset}
    ${this.horizontalReference.value}px 
    ${this.verticalReference.value}px 
    ${this.blurReference.value}px 
    ${this.spreadReference.value}px 
    ${rgba}`;

    this.previewBox.style.backgroundColor = this.boxColorReference.value;

    this.currentRule = this.previewBox.style.boxShadow;
  }

  showRule() {
    this.rule.textContent = `${this.currentRule};`;
    this.webkitRule.textContent = `${this.currentRule};`;
    this.mozRule.textContent = `${this.currentRule};`;
  }

  updateBoxShadow() {
    this.applyBoxShadow();
    this.showRule();
  }

  hexToRgb(hex) {
    return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
      ("0x" + hex[5] + hex[6]) | 0
    }`;
  }
}

// Selecting elements
const horizontalRange = document.querySelector("#horizontal");
const horizontalReference = document.querySelector("#horizontal-reference");
const verticalRange = document.querySelector("#vertical");
const verticalReference = document.querySelector("#vertical-reference");
const blurRange = document.querySelector("#blur");
const blurReference = document.querySelector("#blur-reference");
const spreadRange = document.querySelector("#spread");
const spreadReference = document.querySelector("#spread-reference");
const shadowColor = document.querySelector("#shadow-color");
const shadowColorReference = document.querySelector("#shadow-color-reference");
const boxColor = document.querySelector("#box-color");
const boxColorReference = document.querySelector("#box-color-reference");
const opacityRange = document.querySelector("#opacity");
const opacityReference = document.querySelector("#opacity-reference");
const insetCheckbox = document.querySelector("#inset");

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const rulesArea = document.querySelector("#rules-area");
const copyInstructions = document.querySelector("#copy-instructions");

const boxShadowGenerator = new BoxShadowGenerator(
  horizontalRange,
  horizontalReference,
  verticalRange,
  verticalReference,
  blurRange,
  blurReference,
  spreadRange,
  spreadReference,
  shadowColor,
  shadowColorReference,
  boxColor,
  boxColorReference,
  opacityRange,
  opacityReference,
  insetCheckbox,
  previewBox,
  rule,
  webkitRule,
  mozRule
);

boxShadowGenerator.initialize();

// Functions
const setupInputEventListeners = (rangeInput, referenceInput) => {
  rangeInput.addEventListener("input", () => {
    referenceInput.value = rangeInput.value;
    boxShadowGenerator.updateBoxShadow();
  });

  referenceInput.addEventListener("input", () => {
    rangeInput.value = referenceInput.value;
    boxShadowGenerator.updateBoxShadow();
  });
};

// Event listeners
setupInputEventListeners(horizontalRange, horizontalReference);
setupInputEventListeners(verticalRange, verticalReference);
setupInputEventListeners(blurRange, blurReference);
setupInputEventListeners(spreadRange, spreadReference);
setupInputEventListeners(shadowColor, shadowColorReference);
setupInputEventListeners(boxColor, boxColorReference);
setupInputEventListeners(opacityRange, opacityReference);
insetCheckbox.addEventListener("change", () => {
  boxShadowGenerator.updateBoxShadow();
});

// Copy to clipboard
rulesArea.addEventListener("click", () => {
  const rules = rulesArea.textContent.replace(/^\s*\n/gm, "");

  navigator.clipboard.writeText(rules).then(() => {
    copyInstructions.textContent = "Copied to clipboard!";
    setTimeout(() => {
      copyInstructions.textContent = "Click to copy to clipboard";
    }, 1000);
  });
});
