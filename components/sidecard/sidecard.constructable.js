const style = new CSSStyleSheet();

style.replaceSync(/* css */ `
  :host {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -300px;
    transition: left 0.2s linear;
    z-index: 10;
    background: var(--clr-grey);
    box-shadow: 2px 0 5px rgba(0,0,0,0.2);
  }

  :host(.open) {
    left: 0;
  }

  :host button {
    border-style: none;
  }
`);

export default style;
