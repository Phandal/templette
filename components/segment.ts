import globalStyle from '../styles/global.js';
import type TempletteElement from './element.js';

// Template
const template = document.createElement('template');
template.id = 'templette-segment-template';
template.innerHTML = /* html */ `
<li class="segment-content">
  <p>Segment_Name</p>
    <div class="segment-counts">
      <p class="element-count"># Elements</p>
      <p class="children-count"># Children</p>
    </div>
    <div class="segment-actions">
      <button class="edit">Edit</button>
      <button class="remove">Remove</button>
    </div>
</li>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  li {
    list-style: none;
    border: 1px solid var(--clr-black);
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    background-color: var(--clr-grey);
  }

  div.segment-counts, div.segment-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`);

class TempletteSegment extends HTMLElement {
  public guid = '';
  public name = '';
  public container = false;
  public elements: TempletteElement[] = [];
  public descendants: TempletteSegment[] = [];
  public filter?: Filter;
  public repetition?: Repetition;
  public ignore?: string;
  public trim?: boolean;
  public closeRule?: CloseSegmentRule;

  public elementCount: HTMLParagraphElement;
  public childrenCount: HTMLParagraphElement;
  public editButton: HTMLButtonElement;
  public removeButton: HTMLButtonElement;

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

  public getSegment(): SegmentRule {
    const children = this.descendants.map((child) => {
      return child.getSegment();
    });

    const elements = this.elements.map((element) => {
      return element.getElement();
    });

    if (this.container) {
      return {
        name: this.name,
        children,
        container: true,
        filter: this.filter,
        repetition: this.repetition,
        ignore: this.ignore,
      };
    }

    return {
      name: this.name,
      elements,
      children,
      container: false,
      filter: this.filter,
      repetition: this.repetition,
      ignore: this.ignore,
      trim: this.trim,
      closeRule: undefined, // TODO
    };
  }

  public removeSegment(): void {
    console.log('removing this segment');
    this.dispatchEvent(
      new CustomEvent('remove-segment', { detail: { id: this.guid } }),
    );
    this.remove();
  }

  public editSegment(): void {
    console.log('editing this segment');
    this.dispatchEvent(
      new CustomEvent('edit-segment', { detail: { id: this.guid } }),
    );
  }

  public addListeners(): void {
    this.removeButton.addEventListener('click', this.removeSegment);
    this.editButton.addEventListener('click', this.editSegment);
  }

  public removeListeners(): void {
    this.removeButton.removeEventListener('click', this.removeSegment);
    this.editButton.removeEventListener('click', this.editSegment);
  }

  public connectedCallback(): void {
    this.guid = crypto.randomUUID();

    this.addListeners();
  }

  public disconnectedCallback(): void {
    this.removeListeners();
  }
}

window.customElements.define('templette-segment', TempletteSegment);

export default TempletteSegment;
