import globalStyle from '../styles/global.js';

// Template
const template = document.createElement('template');
template.id = 'templette-app-template';
template.innerHTML = /* html */ `
  <templette-builder></templette-builder>
  <templette-io></templette-io>
`;

// Styles
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    display: grid;
    grid-template-columns: 4fr 3fr;
  }

  :host > * {
    padding: 0px 10px;
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
