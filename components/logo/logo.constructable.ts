const sheet = new CSSStyleSheet();

sheet.replaceSync(/* css */ `
  header {
    background: var(--clr-grey);
    padding: calc(var(--header-padding) + 3px);
  }
`);

export default sheet;
