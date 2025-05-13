import globalStyle from '../styles/global.js';

// Template
const template = document.createElement('template');
template.id = 'templette-input-template';
template.innerHTML = /* html */ `
  <label for></label>
  <input type id name />
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    display: grid;
    gap: 2px;
  }

  input {
    border-radius: var(--border-radius);
    border-style: none;
    font-size: large;
  }
`);

class TempletteInput extends HTMLElement {
  private labelNode: HTMLLabelElement;

  private inputNode: HTMLInputElement;

  static observedAttributes = ['name'];

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    this.labelNode = <HTMLLabelElement>node.querySelector('label');
    this.inputNode = <HTMLInputElement>node.querySelector('input');

    shadow.append(node);

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
  }

  public getValue(): string | boolean {
    const type = this.getAttribute('type');

    if (type === 'text') {
      return this.inputNode.value ?? '';
    }
    return this.inputNode.checked;
  }

  public setValue(val?: string | boolean): void {
    const type = this.getAttribute('type');

    if (type === 'text') {
      this.inputNode.value = val ? val.toString() : '';
    } else if (type === 'checkbox') {
      this.inputNode.checked = !!val;
    }
  }

  update(): void {
    const name = this.getAttribute('name') || '';

    this.labelNode.setAttribute('for', name);
    this.labelNode.textContent = name;

    this.inputNode.setAttribute('id', name);
    this.inputNode.setAttribute('name', name);
  }

  public connectedCallback(): void {
    const type = this.getAttribute('type') || 'text';
    this.inputNode.setAttribute('type', type);
  }

  public attributeChangedCallback(): void {
    this.update();
  }
}

window.customElements.define('templette-input', TempletteInput);

export default TempletteInput;
