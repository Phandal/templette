import template from './footer.template.js';
import style from './footer.constructable.js';
import global from '../../styles/global.constructable.js';

class TempletteFooter extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [global, style];
    shadow.append(node);
  }
}

window.customElements.define('templette-footer', TempletteFooter);

export default TempletteFooter;
