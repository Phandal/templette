import TempletteSegment from '../segment/segment.component.js';
import template from './segment-list.template.js';

class TempletteSegmentList extends HTMLElement {
  shadow;
  list;
  addButton;

  /** @type {TempletteSegment[]} */
  #segments = [];

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    this.addButton = node.querySelector('button.segment-list-add');
    this.list = node.querySelector('ul');

    this.addSegment = this.addSegment.bind(this);
    this.removeSegment = this.removeSegment.bind(this);

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.append(node);
  }

  /**
   * Adds a segment to the list of segments manages by this component
   * @param {Event} ev
   */
  addSegment(ev) {
    const { detail: options } = /** @type {CustomEvent<CreateSegment>} */ (ev);

    const segmentComponent = new TempletteSegment();
    segmentComponent.setAttribute('segment-id', options.id);
    segmentComponent.setAttribute('segment-name', options.name);

    segmentComponent.addEventListener('remove-segment', this.removeSegment);

    this.#segments.push(segmentComponent);
    this.list?.appendChild(segmentComponent);
  }

  /**
   * Removes a segment from the list of segments managed by this component
   * @param {Event} ev
   */
  removeSegment(ev) {
    const customEvent = /** @type {CustomEvent<RemoveSegment>} */ (ev);
    console.log('removing segment with id', customEvent.detail.id);

    this.#segments = this.#segments.filter((segment) => {
      return segment.segmentId !== customEvent.detail.id;
    });
  }

  addListeners() {
    this.addButton?.addEventListener('click', this.addSegment);
  }

  removeListeners() {
    this.addButton?.removeEventListener('click', this.addSegment);
  }

  connectedCallback() {
    this.addListeners();
  }

  disconnectedCallback() {
    this.removeListeners();
  }
}

window.customElements.define('templette-segment-list', TempletteSegmentList);

export default TempletteSegmentList;
