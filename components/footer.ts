import globalStyle from '../styles/global.constructable.js';

// Template
const template = document.createElement('template');
template.id = 'templette-footer-template';
template.innerHTML = /* html */ `
  <footer><p>Made by <a href="https://github.com/Phandal">Phandal</a></p></footer>
`;

// Style
const localStyle = new CSSStyleSheet();
const css = /* css */ `
  footer {
    font-size: x-small;
    display: flex;
    justify-content: center;
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
