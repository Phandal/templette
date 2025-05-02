import globalStyle from '../styles/global.constructable.js';

// Template
const template = document.createElement('template');
template.id = 'templette-io-template';
template.innerHTML = /* html */ `
  <div>
    <templette-editor language="json"></templette-editor>
    <templette-editor language=""></templette-editor>
  </div>
`;

const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host{
    display: inline-block;
  }

  div {
    height: 100%;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;
  }
`);

class TempletteIO extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }
}

window.customElements.define('templette-io', TempletteIO);

export default TempletteIO;
