import globalStyle from '../styles/global.constructable.js';

// Template
const template = document.createElement('template');
template.id = 'templette-document-options-template';
template.innerHTML = /* html */ `
  <templette-input name="Name"></templette-input>
  <templette-input name="Version"></templette-input>
  <templette-input name="Element"></templette-input>
  <templette-input name="Segment"></templette-input>
  <templette-input name="Component"></templette-input>
  <templette-input name="Repetition"></templette-input>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    justify-items: center;
    background-color: var(--clr-grey);
    padding: 10px 0px;
    border-radius: var(--border-radius);
  }
`);

class TempletteDocumentOptions extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
  }
}

window.customElements.define(
  'templette-document-options',
  TempletteDocumentOptions,
);

export default TempletteDocumentOptions;
