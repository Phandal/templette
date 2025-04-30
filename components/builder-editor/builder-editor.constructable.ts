const style = new CSSStyleSheet();

style.replaceSync(/* css */ `
  div {
    height: 100vh;
    width: 100vw;
    z-index: 1000;
  }
`);

export default style;