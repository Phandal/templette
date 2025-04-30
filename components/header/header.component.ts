import template from './header.template.js';
import localStyle from './header.constructable.js';
import globalStyle from '../../styles/global.constructable.js';

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
