import template from './builder.template.js';
import globalStyle from '../../styles/global.constructable.js';
import localStyle from './builder.constructable.js';

class TempletteBuilder extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }
}

window.customElements.define('templette-builder', TempletteBuilder);

export default TempletteBuilder;
