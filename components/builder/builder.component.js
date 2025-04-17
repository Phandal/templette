import template from './builder.template.js';

import TempletteSegment from '../segment/segment.component.js';

class TempletteBuilder extends HTMLElement {
  /** @type TempletteSegment[] */
  #segments = [];
  /** @type {HTMLButtonElement} */
  addSegmentButton;
  /** @type {HTMLUListElement} */
  listNode;

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    const addSegmentButton = /** @type HTMLButtonElement */ (
      node.querySelector('button#add-segment')
    );
    const listNode = /** @type HTMLUListElement */ (
      node.querySelector('ul#segment-list')
    );
    if (!addSegmentButton || !listNode) {
      throw new Error('missing expected fields on the builder template');
    }
    this.addSegmentButton = addSegmentButton;
    this.listNode = listNode;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);
  }

  connectedCallback() {
    this.addSegmentButton.onclick = this.addSegment.bind(this);
  }

  addSegment() {
    const segment = new TempletteSegment();
    this.#segments.push(segment);
    this.listNode.append(segment);
  }
}

window.customElements.define('templette-builder', TempletteBuilder);

export default TempletteBuilder;
