import template from './menu-bar.template.js';
import style from './menu-bar.constructable.js';
import global from '../../styles/global.constructable.js';

class TempletteMenuBar extends HTMLElement {
  // /** @type {HTMLButtonElement} */
  // #saveButton;
  //
  // /** @type {HTMLButtonElement} */
  // #loadButton;
  //
  // /** @type {HTMLButtonElement} */
  // #clearButton;
  //
  // /** @type {HTMLButtonElement} */
  // #serializeButton;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    // /** @type {HTMLButtonElement | null } */
    // const save = node.querySelector('button.templette-save');
    // /** @type {HTMLButtonElement | null } */
    // const load = node.querySelector('button.templette-load');
    // /** @type {HTMLButtonElement | null } */
    // const clear = node.querySelector('button.templette-clear');
    // /** @type {HTMLButtonElement | null } */
    // const serialize = node.querySelector('button.templette-process');
    //
    // if (!save || !load || !clear || !serialize) {
    //   throw new Error('missing expected elements');
    // }
    //
    // this.#saveButton = save;
    // this.#loadButton = load;
    // this.#clearButton = clear;
    // this.#serializeButton = serialize;

    shadow.append(node);

    shadow.adoptedStyleSheets = [global, style];
  }
}

window.customElements.define('templette-menu-bar', TempletteMenuBar);

export default TempletteMenuBar;
