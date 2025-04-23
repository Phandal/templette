const sheet = new CSSStyleSheet();

sheet.replaceSync(/* css */ `
  section {
    display: flex
  }
`);

export default sheet;
