import template from './builder.template.js';

class TempletteBuilder extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);
  }
}

window.customElements.define('templette-builder', TempletteBuilder);

export default TempletteBuilder;
