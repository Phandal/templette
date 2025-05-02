import globalStyle from '../styles/global.js';

// Template
const template = document.createElement('template');
template.id = 'templette-logo-template';
template.innerHTML = /* html */ `
  <header>Templette</header>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  header {
    background: var(--clr-grey);
    padding: calc(var(--header-padding) + 3px);
  }
`);

export class TempletteLogo extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
  }
}

window.customElements.define('templette-logo', TempletteLogo);

export default TempletteLogo;
