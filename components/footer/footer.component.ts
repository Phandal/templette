import globalStyle from '../../styles/global.constructable.js';
import localStyle from './footer.constructable.js';
import template from './footer.template.js';

class TempletteFooter extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }
}

window.customElements.define('templette-footer', TempletteFooter);

export default TempletteFooter;
