import template from './data.template.js';

class TempletteData extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);
  }
}

window.customElements.define('templette-data', TempletteData);

export default TempletteData;
