const style = new CSSStyleSheet();

const css = /* css */ `
  footer {
    background-color: red;
  }
`;

style.replaceSync(css);

export default style;
