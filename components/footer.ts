import globalStyle from '../styles/global.constructable.js';

// Template
const template = document.createElement('template');
template.id = 'templette-footer-template';
template.innerHTML = /* html */ `
  <p>Made by <a href="https://github.com/Phandal">Phandal</a></p>
`;

// Style
const localStyle = new CSSStyleSheet();
const css = /* css */ `
  :host {
    font-size: x-small;
    display: flex;
    justify-content: center;
  }

  :host p {
    padding: 0px;
    margin: 0px;
  }
`;

localStyle.replaceSync(css);

class TempletteFooter extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }
}

window.customElements.define('templette-footer', TempletteFooter);

export default TempletteFooter;
