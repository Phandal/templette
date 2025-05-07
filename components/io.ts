import globalStyle from '../styles/global.js';
import type TempletteEditor from './editor.js';

// Template
const template = document.createElement('template');
template.id = 'templette-io-template';
template.innerHTML = /* html */ `
  <div>
    <templette-editor
      id="input"
      language="json"
      boilerplate
    ></templette-editor>

    <templette-editor
      id="output"
      language=""
      readonly
    ></templette-editor>
  </div>
`;

const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host{
    display: inline-block;
  }

  div {
    height: 100%;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;
  }
`);

class TempletteIO extends HTMLElement {
  public inputEditor: TempletteEditor;
  public outputEditor: TempletteEditor;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    this.inputEditor = <TempletteEditor>(
      node.querySelector('templette-editor#input')
    );
    this.outputEditor = <TempletteEditor>(
      node.querySelector('templette-editor#output')
    );

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  public clearOutput(): void {
    this.outputEditor.clear();
  }

  public getInput(): string {
    return this.inputEditor.getContents();
  }
}

window.customElements.define('templette-io', TempletteIO);

export default TempletteIO;
