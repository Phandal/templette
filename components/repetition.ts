import globalStyle from '../styles/global.js';

// Template
const template = document.createElement('template');

template.id = 'templette-repetition-template';
template.innerHTML = /* html */ `
  <div>
    <h4>Repetition</h4>
    <templette-input name="Property" type="text"></templette-input>
    <templette-input name="Filter" type="text"></templette-input>
  </div>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
`);

class TempletteRepetition extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }
}

window.customElements.define('templette-repetition', TempletteRepetition);

export default TempletteRepetition;
