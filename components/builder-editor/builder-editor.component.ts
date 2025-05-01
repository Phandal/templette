import template from './builder-editor.template.js';
import globalStyle from '../../styles/global.constructable.js';
import localStyle from './builder-editor.constructable.js';
// import * as monaco from 'monaco-editor';

class TempletteBuilderEditor extends HTMLElement {
  public editorDiv: HTMLDivElement;
  // private editor: monaco.editor.IStandaloneCodeEditor | undefined = undefined;

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    this.editorDiv = <HTMLDivElement>node.querySelector('div.editor');

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  // public getContents(): string {
  //   return this.editor?.getValue() ?? '';
  // }

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
