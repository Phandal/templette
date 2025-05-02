import * as monaco from 'monaco-editor';
import monacoEditorCSS from 'monaco-editor/min/vs/editor/editor.main.css?inline';
import globalStyle from '../styles/global.js';

type Language = 'json' | '';

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

    this._editor = <HTMLDivElement>node.querySelector('div.editor');
    this.editor = undefined;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  private createEditor(lang: Language): monaco.editor.IStandaloneCodeEditor {
    return monaco.editor.create(this._editor, {
      language: lang,
      value: lang,
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

  public getLanguage(): string {
    return this.editor?.getModel()?.getLanguageId() ?? '';
  }

  public connectedCallback() {
    const langAttr = this.getAttribute('language');
    this.editor = this.createEditor(isLanguage(langAttr) ? langAttr : '');
  }
}

function isLanguage(lang: string | null): lang is Language {
  const lowerLang = lang?.toLowerCase();
  return lowerLang === 'json' || lowerLang === '';
}

window.customElements.define('templette-editor', TempletteEditor);

export default TempletteEditor;
