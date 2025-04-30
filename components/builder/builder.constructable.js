const style = new CSSStyleSheet();

style.replaceSync(/* css */ `
  :host {
    position: relative;
  }
`);

export default style;
