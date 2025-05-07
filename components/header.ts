import globalStyle from '../styles/global.js';
import type TempletteMenuBar from './menu-bar.js';

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
  public menuBar: TempletteMenuBar;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    this.menuBar = <TempletteMenuBar>node.querySelector('templette-menu-bar');

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }
}

window.customElements.define('templette-header', TempletteHeader);

export default TempletteHeader;
