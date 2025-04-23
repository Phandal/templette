const style = new CSSStyleSheet();

const css = /* css */ `
  footer {
    font-size: x-small;
    display: flex;
    justify-content: center;
  }
`;

style.replaceSync(css);

export default style;
