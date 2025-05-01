import global from '../styles/global.constructable.js';

// Template
const template = document.createElement('template');
template.id = 'templette-menu-bar-template';
template.innerHTML = /* html */ `
  <div>
    <button class="templette-save">Save</button>
    <button class="templette-load">Load</button>
    <button class="templette-clear">Clear</button>
    <button class="templette-process">Serialize</button>
  </div>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  div {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    background-color: var(--clr-black);
    padding: var(--header-padding);
  }

  div button {
    background-color: var(--clr-button);
    color: var(--clr-white);
    border-radius: 4px;
    border-style: none;
    padding: 5px;
  }
`);

class TempletteMenuBar extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.adoptedStyleSheets = [global, localStyle];
    shadow.append(node);
  }
}

window.customElements.define('templette-menu-bar', TempletteMenuBar);

export default TempletteMenuBar;
