import template from './builder-editor.template.js';

class TempletteBuilderEditor extends HTMLElement {
  public editorDiv: HTMLDivElement;

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    this.editorDiv = <HTMLDivElement>node.querySelector('div.editor');

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);
  }

  public connectedCallback() {
    // this.editor = monaco.editor.create(this.editorDiv, {
    //   language: 'json',
    //   wordBasedSuggestions: 'currentDocument',
    //   automaticLayout: true,
    //   readOnly: false,
    //   theme: 'vs-dark',
    //   minimap: {
    //     enabled: false,
    //   },
    //   stickyScroll: {
    //     enabled: false,
    //   },
    // });
  }
}

window.customElements.define(
  'templette-builder-editor',
  TempletteBuilderEditor,
);

export default TempletteBuilderEditor;
