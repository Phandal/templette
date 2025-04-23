import template from './input.template.js';
import localStyle from './input.constructable.js';
import globalStyle from '../../styles/global.constructable.js';

class TempletteInput extends HTMLElement {
  /** @type {HTMLLabelElement} */
  #labelNode;

  /** @type {HTMLInputElement} */
  #inputNode;

  static observedAttributes = ['name'];

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    const labelNode = node.querySelector('label');
    const inputNode = node.querySelector('input');
    if (!labelNode || !inputNode) {
      throw new Error('missing expected attribute');
    }

    this.#labelNode = labelNode;
    this.#inputNode = inputNode;

    shadow.append(node);

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
  }

  /**
   * The callback used when an attribute changes
   * @param {string} attr
   * @param {string} _
   * @param {string} newVal
   */
  attributeChangedCallback(attr, _, newVal) {
    // console.log('attr | new | old:', `${attr} | ${oldVal} | ${newVal}`);
    switch (attr) {
      case 'name':
        this.update(newVal);
        break;
    }
  }

  /**
   * The function called to update the state
   * @param {string} value
   */
  update(value) {
    this.#labelNode.setAttribute('for', value);
    this.#labelNode.textContent = value;

    this.#inputNode.setAttribute('id', value);
    this.#inputNode.setAttribute('name', value);
  }
}

window.customElements.define('templette-input', TempletteInput);

export default TempletteInput;
