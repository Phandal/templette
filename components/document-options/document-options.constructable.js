const sheet = new CSSStyleSheet();

sheet.replaceSync(/* css */ `
  :host {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    background-color: var(--clr-grey);
  }
`);

export default sheet;
