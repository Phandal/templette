import globalStyle from '../styles/global.constructable.js';
import type TempletteElement from './element.js';

// Template
const template = document.createElement('template');
template.id = 'templette-segment-template';
template.innerHTML = /* html */ `
<li class="segment-content">
  <div>
  <p>Segment_Name</p>
    <div class="segment-counts">
      <p class="element-count"># Elements</p>
      <p class="children-count"># Children</p>
    </div>
    <div class="segment-actions">
      <button class="edit">Edit</button>
      <button class="remove">Remove</button>
    </div>
  </div>
</li>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  li {
    list-style: none;
    border: 1px solid var(--clr-black);
  }

  li > div {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
  }

  div.segment-counts, div.segment-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`);

class TempletteSegment extends HTMLElement {
  public segmentId = '';
  public segmentName = '';
  public elementCount: HTMLParagraphElement;
  public childrenCount: HTMLParagraphElement;
  public editButton: HTMLButtonElement;
  public removeButton: HTMLButtonElement;

  public elements: TempletteElement[] = [];

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    this.elementCount = <HTMLParagraphElement>(
      node.querySelector('p.element-count')
    );
    this.childrenCount = <HTMLParagraphElement>(
      node.querySelector('p.children-count')
    );
    this.editButton = <HTMLButtonElement>node.querySelector('button.edit');
    this.removeButton = <HTMLButtonElement>node.querySelector('button.remove');

    this.removeSegment = this.removeSegment.bind(this);
    this.editSegment = this.editSegment.bind(this);

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  removeSegment() {
    console.log('removing this segment');
    this.dispatchEvent(
      new CustomEvent('remove-segment', { detail: { id: this.segmentId } }),
    );
    this.remove();
  }

  editSegment() {
    console.log('editing this segment');
    this.dispatchEvent(
      new CustomEvent('edit-segment', { detail: { id: this.segmentId } }),
    );
  }

  addListeners() {
    this.removeButton?.addEventListener('click', this.removeSegment);
    this.editButton?.addEventListener('click', this.editSegment);
  }

  removeListeners() {
    this.removeButton?.removeEventListener('click', this.removeSegment);
    this.editButton?.removeEventListener('click', this.editSegment);
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
