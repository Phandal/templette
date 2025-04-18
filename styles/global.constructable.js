const style = new CSSStyleSheet();

const css = /* css */ `
  :host * {
    box-sizing: border-box;
  }
`;

style.replaceSync(css);

export default style;
