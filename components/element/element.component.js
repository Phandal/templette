import template from './element.template.js';

class TempletteElement extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.append(node);
  }
}

window.customElements.define('templette-element', TempletteElement);

export default TempletteElement;
