const style = new CSSStyleSheet();

style.replaceSync(/* css */ `
  :host * {
    box-sizing: border-box;
  }
`);

export default style;
