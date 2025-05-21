import globalStyle from '../styles/global.js';
import TempletteSegmentEditor from './segment-editor.js';
import TempletteSegment from './segment.js';

// Template
const template = document.createElement('template');
template.id = 'templette-segment-list-template';
template.innerHTML = /* html */ `
  <button class="segment-list-add">Add Segment</button>
  <div class="overflow-list">
    <ul class="templette-segment-list"></ul>
  </div>
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
  public list: HTMLUListElement;
  public addButton: HTMLButtonElement;

  private segments: TempletteSegment[] = [];

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    this.addButton = <HTMLButtonElement>(
      node.querySelector('button.segment-list-add')
    );
    this.list = <HTMLUListElement>node.querySelector('ul');

    this.addSegmentListener = this.addSegmentListener.bind(this);
    this.removeSegmentListener = this.removeSegmentListener.bind(this);
    this.editSegmentListener = this.editSegmentListener.bind(this);

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [globalStyle, localStyle];
    this.shadow.append(node);
  }

  public getRules(): SegmentRule[] {
    return this.segments.map((segment) => {
      return segment.getSegment();
    });
  }

  public setRules(rules: SegmentRule[]) {
    for (const rule of rules) {
      this.addSegment(rule);
    }
  }

  public addSegment(rule?: SegmentRule): void {
    const segmentComponent = new TempletteSegment();

    segmentComponent.addEventListener('edit-segment', this.editSegmentListener);
    segmentComponent.addEventListener(
      'remove-segment',
      this.removeSegmentListener,
    );
    this.segments.push(segmentComponent);
    this.list.append(segmentComponent);

    if (rule) {
      segmentComponent.setSegment(rule);
    }
  }

  public addSegmentListener(_ev: Event): void {
    this.addSegment();
  }

  public removeSegmentListener(ev: Event): void {
    const customEvent = <CustomEvent<RemoveSegment>>ev;

    this.segments = this.segments.filter((segment) => {
      return segment.guid !== customEvent.detail.id;
    });
  }

  public editSegmentListener(ev: Event): void {
    const customEvent = <CustomEvent<EditSegment>>ev;

    const segment = this.segments.find((segment) => {
      return segment.guid === customEvent.detail.id;
    });
    if (!segment) {
      console.warn(
        `could not find segment with guid '${customEvent.detail.id}'`,
      );
      return;
    }

    const segmentEditor = new TempletteSegmentEditor();
    segmentEditor.addEventListener(
      'update-segment',
      this.updateSegment(segment),
    );
    segmentEditor.loadSegment(segment);

    this.shadow.append(segmentEditor);
    requestAnimationFrame(() => {
      segmentEditor.classList.add('open');
    });
  }

  public updateSegment(segment: TempletteSegment): (ev: Event) => void {
    return (ev: Event) => {
      const customEvent = <CustomEvent<UpdateSegment>>ev;
      const rule = customEvent.detail.rule;
      segment.setSegment(rule);
    };
  }

  public addListeners(): void {
    this.addButton.addEventListener('click', this.addSegmentListener);
  }

  public removeListeners(): void {
    this.addButton.removeEventListener('click', this.addSegmentListener);
  }

  public connectedCallback(): void {
    this.addListeners();
  }

  public disconnectedCallback(): void {
    this.removeListeners();
  }
}

window.customElements.define('templette-segment-list', TempletteSegmentList);

export default TempletteSegmentList;
