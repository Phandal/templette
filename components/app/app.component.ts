import globalStyle from '../../styles/global.constructable.js';
import localStyle from './app.constructable.js';
import template from './app.template.js';

class TempletteApp extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
  }
}

window.customElements.define('templette-app', TempletteApp);

export default TempletteApp;
