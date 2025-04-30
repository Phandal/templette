import globalStyle from '../../styles/global.constructable.js';
import localStyle from './input.constructable.js';
import template from './input.template.js';

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
