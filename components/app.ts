import globalStyle from '../styles/global.constructable.js';

// Template
const template = document.createElement('template');
template.id = 'templette-app-template';
template.innerHTML = /* html */ `
  <templette-builder></templette-builder>
  <templette-builder-editor></templette-builder-editor>
`;

// Styles
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    display: grid;
    grid-template-columns: 4fr 3fr;
    gap: 10px;
  }
`);

// Component
class TempletteApp extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
  }
}

window.customElements.define('templette-app', TempletteApp);

export default TempletteApp;
