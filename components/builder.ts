import globalStyle from '../styles/global.constructable.js';

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
    height: 100%;
    grid-template-rows: auto 1fr;
  }
`);

class TempletteBuilder extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }
}

window.customElements.define('templette-builder', TempletteBuilder);

export default TempletteBuilder;
