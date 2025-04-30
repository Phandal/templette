const style = new CSSStyleSheet();

style.replaceSync(/* css */ `
  :host {
    display: flex;
    flex-direction: column;
  }

  .overflow-list {
    overflow-y: scroll;
    border: 1px solid var(--clr-black);
    flex-grow: 1;
  }
`);

export default style;
