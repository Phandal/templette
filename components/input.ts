import globalStyle from '../styles/global.constructable.js';

// Template
const template = document.createElement('template');
template.id = 'templette-input-template';
template.innerHTML = /* html */ `
  <label for></label>
  <input type="text" id name />
`;


// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    display: grid;
    gap: 2px;
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

  public attributeChangedCallback(
    attr: string,
    _: string,
    newVal: string,
  ): void {
    // console.log('attr | new | old:', `${attr} | ${oldVal} | ${newVal}`);
    switch (attr) {
      case 'name':
        this.update(newVal);
        break;
    }
  }

  update(value: string): void {
    this.labelNode.setAttribute('for', value);
    this.labelNode.textContent = value;

    this.inputNode.setAttribute('id', value);
    this.inputNode.setAttribute('name', value);
  }
}

window.customElements.define('templette-input', TempletteInput);

export default TempletteInput;
