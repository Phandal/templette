const style = new CSSStyleSheet();

style.replaceSync(/* css */ `
  :host * {
    box-sizing: border-box;
  }

  :host button {
    background-color: var(--clr-button);
    color: var(--clr-white);
    border-radius: 4px;
    border-style: none;
    padding: 5px;
  }
`);

export default style;
