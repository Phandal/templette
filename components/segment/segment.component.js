import TempletteElement from '../element/element.component.js';
import template from './segment.template.js';

class TempletteSegment extends HTMLElement {
  /** @type {string} */
  segmentId = '';
  /** @type {string} */
  segmentName = '';
  elementCount;
  childrenCount;
  // childSegments = [];

  /** @type {TempletteElement[]} */
  elements = [];

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    this.elementCount = node.querySelector('p.element-count');
    this.childrenCount = node.querySelector('p.children-count');
    this.editButton = node.querySelector('button.edit');
    this.removeButton = node.querySelector('button.remove');

    this.removeSegment = this.removeSegment.bind(this);

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);
  }

  removeSegment() {
    console.log('removing this segment');
    this.dispatchEvent(
      new CustomEvent('remove-segment', { detail: { id: this.segmentId } }),
    );
    this.remove();
  }

  addListeners() {
    this.removeButton?.addEventListener('click', this.removeSegment);
  }

  removeListeners() {
    this.removeButton?.removeEventListener('click', this.removeSegment);
  }

  connectedCallback() {
    this.segmentId = crypto.randomUUID();

    this.addListeners();
  }

  disconnectedCallback() {
    this.removeListeners();
  }
}

window.customElements.define('templette-segment', TempletteSegment);

export default TempletteSegment;
