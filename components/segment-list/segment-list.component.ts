import globalStyle from '../../styles/global.constructable.ts';
import TempletteSegment from '../segment/segment.component.ts';
import type TempletteSideCard from '../sidecard/sidecard.component.ts';
import localStyle from './segment-list.constructable.ts';
import template from './segment-list.template.ts';

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

  addSegment(ev: Event) {
    const { detail: options } = <CustomEvent<CreateSegment>>ev;

    const segmentComponent = new TempletteSegment();
    segmentComponent.setAttribute('segment-id', options.id);
    segmentComponent.setAttribute('segment-name', options.name);

    segmentComponent.addEventListener('remove-segment', this.removeSegment);
    segmentComponent.addEventListener('edit-segment', this.editSegment);

    this.segments.push(segmentComponent);
    this.list?.appendChild(segmentComponent);
  }

  removeSegment(ev: Event) {
    const customEvent = <CustomEvent<RemoveSegment>>ev;
    console.log('removing segment with id', customEvent.detail.id);

    this.segments = this.segments.filter((segment) => {
      return segment.segmentId !== customEvent.detail.id;
    });
  }

  editSegment(ev: Event) {
    const customEvent = <CustomEvent<EditSegment>>ev;
    console.log('editing segment with id', customEvent.detail.id);

    this.sideCard?.classList.add('open');
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
