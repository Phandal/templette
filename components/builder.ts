import globalStyle from '../styles/global.js';
import type TempletteDocumentOptions from './document-options.js';

// Template
const template = document.createElement('template');
template.id = 'templette-builder-template';
template.innerHTML = /* html */ `
  <templette-document-options></templette-document-options>
  <templette-segment-list></templette-segment-list>
`;

// Style
const localStyle = new CSSStyleSheet();

localStyle.replaceSync(/* css */ `
  :host {
    position: relative;
    display: grid;
    gap: 10px;
    height: 100%;
    grid-template-rows: auto 1fr;
  }
`);

class TempletteBuilder extends HTMLElement {
  public documentOptions: TempletteDocumentOptions;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    this.documentOptions = <TempletteDocumentOptions>(
      node.querySelector('templette-document-options')
    );

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  public getName(): string {
    const DefaultName = 'Custom_Template';
    return this.documentOptions.name.getValue() || DefaultName;
  }

  public build(): Record<string, unknown> {
    const options = this.documentOptions.getOptions();

    return {
      ...options,
      rules: [],
    };
  }
}

window.customElements.define('templette-builder', TempletteBuilder);

export default TempletteBuilder;
