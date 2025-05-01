import globalStyle from '../styles/global.constructable.js';
import * as monaco from 'monaco-editor';
import monacoEditorCSS from 'monaco-editor/min/vs/editor/editor.main.css?inline';

// Template
const template = document.createElement('template');
template.id = 'templette-builder-editor-template';
template.innerHTML = /* html */ `
  <style>${monacoEditorCSS}</style>
  <div class="editor"></div>
`;

// Style
const localStyle = new CSSStyleSheet();

localStyle.replaceSync(/* css */ `
  :host {
    display: inline-block;
  }

  div.editor {
    height: 100%;
    width: 100%;
  }
`);

class TempletteBuilderEditor extends HTMLElement {
  public _editor: HTMLDivElement;
  // private editor: monaco.editor.IStandaloneCodeEditor | undefined = undefined;

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    this._editor = <HTMLDivElement>node.querySelector('div.editor');

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  // public getContents(): string {
  //   return this.editor?.getValue() ?? '';
  // }

  public connectedCallback() {
    monaco.editor.create(this._editor, {
      language: 'javascript',
      value: `console.log('hello world')`,
      wordBasedSuggestions: 'currentDocument',
      automaticLayout: true,
      readOnly: false,
      theme: 'vs-dark',
      minimap: {
        enabled: false,
      },
      stickyScroll: {
        enabled: false,
      },
    });
  }
}

window.customElements.define(
  'templette-builder-editor',
  TempletteBuilderEditor,
);

export default TempletteBuilderEditor;
