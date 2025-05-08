import Ajv, { type AnySchemaObject, type ErrorObject } from 'ajv';
import type { CurrentOptions } from 'ajv/dist/core.js';
import globalStyle from '../styles/global.js';
import type TempletteBuilder from './builder.js';
import type TempletteHeader from './header.js';
import type TempletteIO from './io.js';

const BaseSchemaUrl =
  'https://storageukgreadyedi.blob.core.windows.net/schema-files/';

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

  /**
   * Actually performs the file loading with a hidden input field
   */
  private loadFile(e: Event): void {
    const files = (<HTMLInputElement>e.target).files;
    if (!files || files.length === 0) return;
    const outputEditor = this.io.outputEditor;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = async (e): Promise<void> => {
      try {
        if (!e.target) return;
        const fileContents = e.target.result?.toString() || '';

        const response = await validateSchema(fileContents, {
          loadSchema: loadSchemaHTTPS,
        });

        if (response.valid) {
          this.parseTemplate(response.template);
        } else {
          const responseErrors = response.errors
            .map(
              (err: ErrorObject) =>
                `${err.message} | ${err.instancePath} | ${err.schemaPath}`,
            )
            .join(',');
          outputEditor.setContents(responseErrors);
          this.builder.documentOptions.setOptions();
        }
      } catch (err) {
        outputEditor.setContents(`Error validating schema: ${err}`);
      }
    };

    reader.onerror = (e) => {
      outputEditor.setContents(`Error reading file: ${e}`);
    };

    reader.readAsText(file);
  }

  /**
   * Parses a template object to build all of the UI components
   */
  private parseTemplate(templ: Template): void {
    this.io.clearOutput();
    this.builder.documentOptions.setOptions(templ);
  }

  /**
   * Saves a template to a file.
   */
  private save(): void {
    const name = this.builder.getName();
    const template = this.builder.build();
    const templateStr = JSON.stringify(template, null, 2);

    const templateBlob = new Blob([templateStr], { type: 'application/json' });
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
   * TODO: Make the http request to the server
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

    this.inputFile.removeEventListener('change', this.loadFile);
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

async function validateSchema(
  contents: string,
  options: CurrentOptions,
): Promise<ValidationResponse> {
  const templ = <Record<string, unknown>>JSON.parse(contents);

  const version = templ.version;

  if (!version) {
    return {
      valid: false,
      errors: [
        {
          instancePath: '/',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'version' },
          message: 'must have required property version',
        },
      ],
    };
  }

  const schemaUrl = `${BaseSchemaUrl}v${version}/template.json`;

  try {
    const ajv = new Ajv(options);
    const validate = await ajv.compileAsync({ $ref: schemaUrl });

    const valid = validate(templ);

    if (valid) {
      return {
        valid: true,
        template: templ as unknown as Template,
      };
    }

    return {
      valid: false,
      errors: validate.errors || [],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    throw new Error(
      `failed to fetch schema definition from '${schemaUrl}': ${message}`,
    );
  }
}

async function loadSchemaHTTPS(uri: string): Promise<AnySchemaObject> {
  const res = await fetch(uri, { method: 'GET' });
  if (!res.ok) {
    throw new Error(`schema loading error: ${res.status}`);
  }

  let body: AnySchemaObject;
  try {
    body = <AnySchemaObject>await res.json();
  } catch (err) {
    let message = 'unknown error';
    if (err instanceof Error) {
      message = err.message;
    }
    throw new Error(`schema parsing error: ${message}`);
  }

  return body;
}

export default TempletteApp;
