const style = new CSSStyleSheet();

style.replaceSync(/* css */ `
  :host * {
    box-sizing: border-box;
  }

  :host button {
    background-color: var(--clr-button);
    color: var(--clr-white);
    border-radius: var(--border-radius);
    border-style: none;
    padding: 5px;
  }

  :host button:hover {
    color: var(--clr-black);
  }
`);

export default style;
