import globalStyle from '../styles/global.constructable.js';

// Template
const template = document.createElement('template');

template.id = 'templette-sidecard-template';
template.innerHTML = /* html */ `
  <p>options go here</p>
  <button class="close">X</button>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -300px;
    transition: left 0.2s linear;
    z-index: 10;
    background: var(--clr-grey);
    box-shadow: 2px 0 5px rgba(0,0,0,0.2);
  }

  :host(.open) {
    left: 0;
  }
`);

class TempletteSideCard extends HTMLElement {
  private shadow: ShadowRoot;
  public closeButton: HTMLButtonElement;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    this.shadow = this.attachShadow({ mode: 'open' });

    this.closeButton = <HTMLButtonElement>node.querySelector('button.close');

    this.close = this.close.bind(this);

    this.shadow.adoptedStyleSheets = [globalStyle, localStyle];
    this.shadow.append(node);
  }

  close() {
    this.classList.remove('open');
  }

  addListeners() {
    this.closeButton?.addEventListener('click', this.close);
  }

  removeListeners() {
    this.closeButton?.removeEventListener('click', this.close);
  }

  connectedCallback() {
    this.addListeners();
  }

  disconnectedCallback() {
    this.removeListeners();
  }
}

window.customElements.define('templette-sidecard', TempletteSideCard);

export default TempletteSideCard;
