const sheet = new CSSStyleSheet();

sheet.replaceSync(/* css */ `
  header {
    background: var(--clr-grey);
  }
`);

export default sheet;
