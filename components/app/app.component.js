import template from './app.template.js';

class TempletteApp extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);
  }
}

window.customElements.define('templette-app', TempletteApp);

export default TempletteApp;
