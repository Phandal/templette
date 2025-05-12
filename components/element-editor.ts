import globalStyle from '../styles/global.js';

// Template
const template = document.createElement('template');

template.id = 'templette-element-editor-template';
template.innerHTML = /* html */ `
  <p>element options go here</p>
  <button class="close">X</button>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100%;
    width: 100%;
    transition: left 0.2s linear;
    z-index: 10;
    background: var(--clr-white);
    box-shadow: 2px 0 5px rgba(0,0,0,0.2);
    border-radius: var(--border-radius);
  }

  :host(.open) {
    left: 0;
  }
`);

class TempletteElementEditor extends HTMLElement {
  private shadow: ShadowRoot;
  public closeButton: HTMLButtonElement;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    this.shadow = this.attachShadow({ mode: 'open' });

    this.closeButton = <HTMLButtonElement>node.querySelector('button.close');

    this.close = this.close.bind(this);
    this.remove = this.remove.bind(this);

    this.shadow.adoptedStyleSheets = [globalStyle, localStyle];
    this.shadow.append(node);
  }

  public close(): void {
    this.classList.remove('open');
  }

  public remove(): void {
    if (!this.classList.contains('open')) {
      this.parentNode?.removeChild(this);
    }
  }

  public addListeners(): void {
    this.closeButton.addEventListener('click', this.close);
    this.addEventListener('transitionend', this.remove);
  }

  public removeListeners(): void {
    this.closeButton.removeEventListener('click', this.close);
    this.removeEventListener('transitionend', this.remove);
  }

  public connectedCallback() {
    this.addListeners();
  }

  public disconnectedCallback() {
    this.removeListeners();
  }
}

window.customElements.define(
  'templette-element-editor',
  TempletteElementEditor,
);

export default TempletteElementEditor;
