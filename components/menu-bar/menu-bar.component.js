import template from './menu-bar.template.js';
import style from './menu-bar.constructable.js';
import global from '../../styles/global.constructable.js';

class TempletteMenuBar extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);

    shadow.adoptedStyleSheets = [global, style];
  }
}

window.customElements.define('templette-menu-bar', TempletteMenuBar);

export default TempletteMenuBar;
