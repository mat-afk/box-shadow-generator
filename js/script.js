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

    this.applyBoxShadow();
    this.showRule();
  }

  applyBoxShadow() {
    this.previewBox.style.boxShadow = `${this.horizontalReference.value}px 
    ${this.verticalReference.value}px 
    ${this.blurReference.value}px 
    ${this.spreadReference.value}px 
    #000000`;

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

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const boxShadowGenerator = new BoxShadowGenerator(
  horizontalRange,
  horizontalReference,
  verticalRange,
  verticalReference,
  blurRange,
  blurReference,
  spreadRange,
  spreadReference,
  previewBox,
  rule,
  webkitRule,
  mozRule
);

boxShadowGenerator.initialize();

// Event listeners
horizontalRange.addEventListener("input", () => {
  horizontalReference.value = horizontalRange.value;
  boxShadowGenerator.updateBoxShadow();
});

horizontalReference.addEventListener("input", () => {
  horizontalRange.value = horizontalReference.value;
  boxShadowGenerator.updateBoxShadow();
});

verticalRange.addEventListener("input", () => {
  verticalReference.value = verticalRange.value;
  boxShadowGenerator.updateBoxShadow();
});

verticalReference.addEventListener("input", () => {
  verticalRange.value = verticalReference.value;
  boxShadowGenerator.updateBoxShadow();
});

blurRange.addEventListener("input", () => {
  blurReference.value = blurRange.value;
  boxShadowGenerator.updateBoxShadow();
});

blurReference.addEventListener("input", () => {
  blurRange.value = blurReference.value;
  boxShadowGenerator.updateBoxShadow();
});

spreadRange.addEventListener("input", () => {
  spreadReference.value = spreadRange.value;
  boxShadowGenerator.updateBoxShadow();
});

spreadReference.addEventListener("input", () => {
  spreadRange.value = spreadReference.value;
  boxShadowGenerator.updateBoxShadow();
});
