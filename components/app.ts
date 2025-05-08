import globalStyle from '../styles/global.js';
import type TempletteHeader from './header.js';
import type TempletteBuilder from './builder.js';
import type TempletteIO from './io.js';

// Template
const template = document.createElement('template');
template.id = 'templette-app-template';
template.innerHTML = /* html */ `
  <input type=file id="hidden-file-input" hidden>
  <templette-header></templette-header>
  <div class="app">
    <templette-builder></templette-builder>
    <templette-io></templette-io>
  </div>
  <templette-footer></templette-footer>
`;

// Styles
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 10px;
    height: 100vh;
    background-color: var(--clr-white);
  }
  div.app {
    display: grid;
    grid-template-columns: 4fr 3fr;
  }

  div.app > * {
    padding: 0px 10px;
  }
`);

// Component
class TempletteApp extends HTMLElement {
  private header: TempletteHeader;
  private builder: TempletteBuilder;
  private io: TempletteIO;
  private inputFile: HTMLInputElement;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    this.header = <TempletteHeader>node.querySelector('templette-header');
    this.builder = <TempletteBuilder>node.querySelector('templette-builder');
    this.io = <TempletteIO>node.querySelector('templette-io');
    this.inputFile = <HTMLInputElement>(
      node.querySelector('input#hidden-file-input')
    );

    this.loadFile = this.loadFile.bind(this);
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
    this.clear = this.clear.bind(this);
    this.serialize = this.serialize.bind(this);

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  private loadFile(e: Event): void {
    const files = (<HTMLInputElement>e.target).files;
    if (!files || files.length === 0) return;
    const outputEditor = this.io.outputEditor;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target) return;
      const fileContents = e.target.result || '';

      outputEditor.setContents(fileContents.toString());
    };

    reader.onerror = (e) => {
      outputEditor.setContents(`Error reading file: ${e}`);
    };

    reader.readAsText(file);
  }

  /**
   * Saves a template to a file.
   */
  private save(): void {
    const name = this.builder.getName();
    const template = JSON.stringify(this.builder.build(), null, 2);

    const templateBlob = new Blob([template], { type: 'application/json' });
    const url = URL.createObjectURL(templateBlob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${name}.json`);
    link.click();
    link.remove();
  }

  /**
   * Loads a template from a file.
   */
  private load(): void {
    // Use a hidden <input type="file"> to get trigger the file open dialog
    this.inputFile.click();
  }

  /**
   * Clears the output editor contents
   */
  private clear(): void {
    this.io.clearOutput();
  }

  /**
   * Serializes the data according to the template.
   * TODO
   */
  private serialize(): void {
    const template = this.builder.build();
    const input = this.io.getInput();

    this.io.outputEditor.setContents(
      JSON.stringify({ template, input }, null, 2),
    );
  }

  private addListeners(): void {
    const menuBar = this.header.menuBar;

    this.inputFile.addEventListener('change', this.loadFile);
    menuBar.saveButton.addEventListener('click', this.save);
    menuBar.loadButton.addEventListener('click', this.load);
    menuBar.clearButton.addEventListener('click', this.clear);
    menuBar.serializeButton.addEventListener('click', this.serialize);
  }

  private removeListeners(): void {
    const menuBar = this.header.menuBar;

    menuBar.saveButton.removeEventListener('click', this.save);
    menuBar.loadButton.removeEventListener('click', this.load);
    menuBar.clearButton.removeEventListener('click', this.clear);
    menuBar.serializeButton.removeEventListener('click', this.serialize);
  }

  connectedCallback(): void {
    this.addListeners();
  }

  disconnectedCallback(): void {
    this.removeListeners();
  }
}

window.customElements.define('templette-app', TempletteApp);

export default TempletteApp;
