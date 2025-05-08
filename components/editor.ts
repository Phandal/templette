import * as monaco from 'monaco-editor';
import monacoEditorCSS from 'monaco-editor/min/vs/editor/editor.main.css?inline';
import globalStyle from '../styles/global.js';

const InputBoilerPlate =
  /* json */
  `{
  "documentNumber": 3,
  "members": [
    {
      "name": "Jack"
    }
  ]
}`;

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
  div.editor {
    height: 100%;
  }
`);

class TempletteEditor extends HTMLElement {
  private _editor: HTMLDivElement;
  private editor: monaco.editor.IStandaloneCodeEditor | undefined;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    this._editor = <HTMLDivElement>node.querySelector('div.editor');
    this.editor = undefined;

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  private createEditor(
    options: CreateEditorOptions,
  ): monaco.editor.IStandaloneCodeEditor {
    return monaco.editor.create(this._editor, {
      language: options.language,
      value: options.boilerPlate ? InputBoilerPlate : '',
      wordBasedSuggestions: 'currentDocument',
      automaticLayout: true,
      readOnly: options.readonly,
      theme: 'vs-dark',
      minimap: {
        enabled: false,
      },
      stickyScroll: {
        enabled: false,
      },
    });
  }

  public clear(): void {
    this.editor!.setValue('');
  }

  public getContents(): string {
    return this.editor!.getValue();
  }

  public setContents(contents: string): void {
    this.editor?.setValue(contents);
  }

  public connectedCallback(): void {
    const langAttr = this.getAttribute('language');

    this.editor = this.createEditor({
      language: isLanguage(langAttr) ? langAttr : '',
      readonly: this.hasAttribute('readonly'),
      boilerPlate: this.hasAttribute('boilerplate'),
    });
  }
}

function isLanguage(lang: string | null): lang is Language {
  const lowerLang = lang?.toLowerCase();
  return lowerLang === 'json' || lowerLang === '';
}

window.customElements.define('templette-editor', TempletteEditor);

export default TempletteEditor;
