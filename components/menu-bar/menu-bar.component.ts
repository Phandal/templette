import global from '../../styles/global.constructable.js';
import style from './menu-bar.constructable.js';
import template from './menu-bar.template.js';

class TempletteMenuBar extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.adoptedStyleSheets = [global, style];
    shadow.append(node);
  }
}

window.customElements.define('templette-menu-bar', TempletteMenuBar);

export default TempletteMenuBar;
