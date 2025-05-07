import globalStyle from '../styles/global.js';
import TempletteSegment from './segment.js';
import type TempletteSideCard from './sidecard.js';

// Template
const template = document.createElement('template');
template.id = 'templette-segment-list-template';
template.innerHTML = /* html */ `
  <button class="segment-list-add">Add Segment</button>
  <div class="overflow-list">
    <ul class="templette-segment-list"></ul>
  </div>
  <templette-sidecard></templette-sidecard>
`;

// Style
const localStyle = new CSSStyleSheet();

localStyle.replaceSync(/* css */ `
  :host {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
    background-color: var(--clr-black);
    border-radius: var(--border-radius);
  }

  div.overflow-list {
    position: relative;
    height: 100%;
    min-height: 0;
  }

  ul.templette-segment-list {
    padding: 0;
    margin: 0;
    overflow-y: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`);

class TempletteSegmentList extends HTMLElement {
  public shadow: ShadowRoot;
  public sideCard: TempletteSideCard;
  public list: HTMLUListElement;
  public addButton: HTMLButtonElement;

  private segments: TempletteSegment[] = [];

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    this.addButton = <HTMLButtonElement>(
      node.querySelector('button.segment-list-add')
    );
    this.sideCard = <TempletteSideCard>node.querySelector('templette-sidecard');
    this.list = <HTMLUListElement>node.querySelector('ul');

    this.addSegment = this.addSegment.bind(this);
    this.removeSegment = this.removeSegment.bind(this);
    this.editSegment = this.editSegment.bind(this);

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [globalStyle, localStyle];
    this.shadow.append(node);
  }

  addSegment(_ev: Event) {
    const segmentComponent = new TempletteSegment();
    segmentComponent.setAttribute('segment-name', 'Segment_Name');

    segmentComponent.addEventListener('remove-segment', this.removeSegment);
    segmentComponent.addEventListener('edit-segment', this.editSegment);

    this.segments.push(segmentComponent);
    this.list?.appendChild(segmentComponent);
  }

  removeSegment(ev: Event) {
    const customEvent = <CustomEvent<RemoveSegment>>ev;

    this.segments = this.segments.filter((segment) => {
      return segment.segmentId !== customEvent.detail.id;
    });
  }

  editSegment(ev: Event) {
    const customEvent = <CustomEvent<EditSegment>>ev;
    console.log('editing segment with id', customEvent.detail.id);

    const segment = this.segments.find((segment) => {
      return segment.segmentId === customEvent.detail.id;
    });

    console.log('segment', segment);

    this.sideCard?.classList.add('open');
  }

  addListeners() {
    this.addButton.addEventListener('click', this.addSegment);
  }

  removeListeners() {
    this.addButton.removeEventListener('click', this.addSegment);
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
