import template from './builder.template.js';

import TempletteSegment from '../segment/segment.component.js';

class TempletteBuilder extends HTMLElement {
  /** @type TempletteSegment[] */
  #segments = [];

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    /** @type {HTMLButtonElement} */
    this.addSegmentButton = node.querySelector('#add-segment');
    /** @type {HTMLUListElement} */
    this.listNode = node.querySelector('.segment-list');

    this.addSegmentButton.onclick = this.addSegment.bind(this);

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);
  }

  addSegment() {
    const segment = new TempletteSegment();
    this.#segments.push();
    this.listNode.append(segment);
  }
}

window.customElements.define('templette-builder', TempletteBuilder);

export default TempletteBuilder;
