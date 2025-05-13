import globalStyle from '../styles/global.js';
import type TempletteElement from './element.js';

// Template
const template = document.createElement('template');
template.id = 'templette-segment-template';
template.innerHTML = /* html */ `
<li class="segment-content">
  <p class="segment-name"></p>
    <div class="segment-counts">
      <p class="element-count"></p>
      <p class="children-count"></p>
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

  public segmentNameParagragh: HTMLParagraphElement;
  public elementCountParagraph: HTMLParagraphElement;
  public childrenCountParagraph: HTMLParagraphElement;
  public editButton: HTMLButtonElement;
  public removeButton: HTMLButtonElement;

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    this.segmentNameParagragh = <HTMLParagraphElement>(
      node.querySelector('p.segment-name')
    );
    this.elementCountParagraph = <HTMLParagraphElement>(
      node.querySelector('p.element-count')
    );
    this.childrenCountParagraph = <HTMLParagraphElement>(
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

  public setSegment(rule: SegmentRule) {
    // TODO set children and elements recursively
    this.name = rule.name;
    this.filter = rule.filter;
    this.repetition = rule.repetition;
    this.ignore = rule.ignore;

    if (rule.container) {
      this.container = true;
    } else {
      this.container = false;
      this.trim = rule.trim;
      this.closeRule = rule.closeRule;
    }

    this.update();
  }

  public removeSegment(): void {
    console.log('removing this segment');
    this.dispatchEvent(
      new CustomEvent<RemoveSegment>('remove-segment', {
        detail: { id: this.guid },
      }),
    );
    this.remove();
  }

  public editSegment(): void {
    console.log('editing this segment');
    this.dispatchEvent(
      new CustomEvent<EditSegment>('edit-segment', {
        detail: { id: this.guid },
      }),
    );
  }

  public update(): void {
    this.segmentNameParagragh.textContent = this.name;
    this.elementCountParagraph.textContent = `${this.elements.length.toString()} Elements`;
    this.childrenCountParagraph.textContent = `${this.descendants.length.toString()} Children`;
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
    this.name = 'New Segment';

    this.addListeners();
    this.update();
  }

  public disconnectedCallback(): void {
    this.removeListeners();
  }
}

window.customElements.define('templette-segment', TempletteSegment);

export default TempletteSegment;
