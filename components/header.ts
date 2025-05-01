import globalStyle from '../styles/global.constructable.js';

// Template
const template = document.createElement('template');
template.id = 'templette-header-template';
template.innerHTML = `
  <templette-logo></templette-logo>
  <templette-menu-bar></templette-menu-bar>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    display: flex;
    justify-content: space-between;
  }

  templette-menu-bar {
    flex: 1;
  }
`);

class TempletteHeader extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
  }
}

window.customElements.define('templette-header', TempletteHeader);

export default TempletteHeader;
