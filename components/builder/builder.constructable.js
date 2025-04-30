const style = new CSSStyleSheet();

style.replaceSync(/* css */ `
  :host {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
  }
`);

export default style;
