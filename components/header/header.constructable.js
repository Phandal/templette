const sheet = new CSSStyleSheet();

sheet.replaceSync(/* css */ `
  :host {
    display: flex;
    justify-content: space-between;
  }

  templette-menu-bar {
    flex: 1;
  }
`);

export default sheet;
