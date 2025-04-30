const style = new CSSStyleSheet();

style.replaceSync(/* css */ `
  :host {
    display: grid;
    grid-template-rows: auto 1fr;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  .overflow-list {
    overflow-y: auto;
    border: 1px solid var(--clr-black);
  }
`);

export default style;
