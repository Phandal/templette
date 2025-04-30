import template from './logo.template.js';
import localStyle from './logo.constructable.js';
import globalStyle from '../../styles/global.constructable.js';

export class TempletteLogo extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
  }
}

window.customElements.define('templette-logo', TempletteLogo);

export default TempletteLogo;
