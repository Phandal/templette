import template from './document-options.template.js';
import localStyle from './document-options.constructable.js';
import globalStyle from '../../styles/global.constructable.js';

class TempletteDocumentOptions extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
  }
}

window.customElements.define('templette-document-options', TempletteDocumentOptions);

export default TempletteDocumentOptions;
