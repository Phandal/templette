import template from './builder-editor.template.js';

class TempletteBuilderEditor extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.append(node);
  }
}

window.customElements.define(
  'templette-builder-editor',
  TempletteBuilderEditor,
);

export default TempletteBuilderEditor;
