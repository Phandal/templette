import TempletteSegment from '../segment/segment.component.js';
import template from './segment-list.template.js';
import globalStyle from '../../styles/global.constructable.js';
import localStyle from './segment-list.constructable.js';

class TempletteSegmentList extends HTMLElement {
  shadow;
  sideCard;
  list;
  addButton;

  /** @type {TempletteSegment[]} */
  #segments = [];

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    this.addButton = node.querySelector('button.segment-list-add');
    this.sideCard = node.querySelector('templette-sidecard');
    this.list = node.querySelector('ul');

    this.addSegment = this.addSegment.bind(this);
    this.removeSegment = this.removeSegment.bind(this);
    this.editSegment = this.editSegment.bind(this);

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [globalStyle, localStyle];
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
    segmentComponent.addEventListener('edit-segment', this.editSegment);

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

  /**
   * Shows the sidecard with the segment to be edited
   * @param {Event} ev
   */
  editSegment(ev) {
    const customEvent = /** @type {CustomEvent<EditSegment>} */ (ev);
    console.log('editing segment with id', customEvent.detail.id);

    this.sideCard?.classList.add('open');
    // this.sideCard?.setAttribute('state', 'open');
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
