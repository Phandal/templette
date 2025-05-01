import globalStyle from '../styles/global.constructable.js';

// Template
const template = document.createElement('template');
template.id = 'templette-app-template';
template.innerHTML = /* html */ `
  <section class="app">
    <templette-builder></templette-builder>
    <templette-builder-editor></templette-builder-editor>
  </section>
`;

// Styles
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: 100%;
    width: 100%;
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
