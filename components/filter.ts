import globalStyle from '../styles/global.js';

// Template
const template = document.createElement('template');

template.id = 'templette-filter-template';
template.innerHTML = /* html */ `
  <div>
    <h4>Fitler</h4>
    <templette-input name="Property" type="text"></templette-input>
    <templette-input name="Expression" type="text"></templette-input>
  </div>
`;

const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `

`);

class TempletteFilter extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }
}

window.customElements.define('templette-filter', TempletteFilter);

export default TempletteFilter;
