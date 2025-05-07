import global from '../styles/global.js';

// Template
const template = document.createElement('template');
template.id = 'templette-menu-bar-template';
template.innerHTML = /* html */ `
  <button class="templette-save">Save</button>
  <button class="templette-load">Load</button>
  <button class="templette-clear">Clear</button>
  <button class="templette-process">Serialize</button>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    background-color: var(--clr-black);
    padding: var(--header-padding);
  }
`);

class TempletteMenuBar extends HTMLElement {
  public saveButton: HTMLButtonElement;
  public loadButton: HTMLButtonElement;
  public clearButton: HTMLButtonElement;
  public serializeButton: HTMLButtonElement;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    this.saveButton = <HTMLButtonElement>(
      node.querySelector('button.templette-save')
    );

    this.loadButton = <HTMLButtonElement>(
      node.querySelector('button.templette-load')
    );

    this.clearButton = <HTMLButtonElement>(
      node.querySelector('button.templette-clear')
    );

    this.serializeButton = <HTMLButtonElement>(
      node.querySelector('button.templette-process')
    );

    shadow.adoptedStyleSheets = [global, localStyle];
    shadow.append(node);
  }
}

window.customElements.define('templette-menu-bar', TempletteMenuBar);

export default TempletteMenuBar;
