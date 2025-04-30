import globalStyle from '../../styles/global.constructable.js';
import localStyle from './sidecard.constructable.js';
import template from './sidecard.template.js';

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
