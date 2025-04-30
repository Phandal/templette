const style = new CSSStyleSheet();

style.replaceSync(/* css */ `
  .overflow-list {
    overflow-y: scroll;
    border: 1px solid var(--clr-black);
    height: 100vh;
    /* TODO fix the height */
  }
`);

export default style;
