const sheet = new CSSStyleSheet();

sheet.replaceSync(/* css */ `
  :host {
    display: grid;
    gap: 2px;
  }
`);

export default sheet;
