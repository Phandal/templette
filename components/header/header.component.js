import template from './header.template.js';

class TempletteHeader extends HTMLElement {
  /** @type {HTMLButtonElement} */
  saveButton;

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    const saveButton = /** @type {HTMLButtonElement} */ (
      node.querySelector('button#save')
    );
    if (!saveButton) {
      throw new Error('missing expected elements in header template');
    }
    this.saveButton = saveButton;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);
  }

  connectedCallback() {
    this.saveButton.onclick = this.save.bind(this);
  }

  /**
   * Event handler for when the save button is clicked.
   * @param {Event} ev
   * @returns {void}
   */
  save(ev) {
    console.log(`Save button fired with event '${ev.type}'`);
  }
}

window.customElements.define('templette-header', TempletteHeader);

export default TempletteHeader;
