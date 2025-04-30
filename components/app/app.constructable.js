const sheet = new CSSStyleSheet();

sheet.replaceSync(/* css */ `
  section {
    display: grid;
    grid-template-columns: 3fr 1fr;
    height: 100%;
    width: 100%;
    gap: 10px;
  }
`);

export default sheet;
