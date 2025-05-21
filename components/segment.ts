import globalStyle from '../styles/global.js';

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
  public elements: ElementRule[] = [];
  public descendants: SegmentRule[] = [];
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
    this.name = 'New Segment';

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

    this.editSegment = this.editSegment.bind(this);
    this.removeSegment = this.removeSegment.bind(this);

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  public getSegment(): SegmentRule {
    if (this.container) {
      return {
        name: this.name,
        container: true,
        filter: this.filter,
        repetition: this.repetition,
        ignore: this.ignore,
        children: this.descendants,
      };
    }

    return {
      name: this.name,
      container: false,
      filter: this.filter,
      repetition: this.repetition,
      ignore: this.ignore,
      trim: this.trim,
      closeRule: undefined, // TODO
      elements: this.elements,
      children: this.descendants,
    };
  }

  public setSegment(rule: SegmentRule) {
    this.name = rule.name;
    this.filter = rule.filter;
    this.repetition = rule.repetition;
    this.ignore = rule.ignore;
    this.descendants = rule.children;

    if (rule.container) {
      this.container = true;
    } else {
      this.container = false;
      this.trim = rule.trim;
      this.elements = rule.elements;
      this.closeRule = rule.closeRule;
    }

    this.update();
  }

  public editSegment(): void {
    this.dispatchEvent(
      new CustomEvent<EditSegment>('edit-segment', {
        detail: { id: this.guid },
      }),
    );
  }

  public removeSegment(): void {
    this.dispatchEvent(
      new CustomEvent<RemoveSegment>('remove-segment', {
        detail: { id: this.guid },
      }),
    );
    this.remove();
  }

  public update(): void {
    this.segmentNameParagragh.textContent = this.name;
    this.elementCountParagraph.textContent = `${this.elements.length.toString()} Elements`;
    this.childrenCountParagraph.textContent = `${this.descendants.length.toString()} Children`;
  }

  public addListeners(): void {
    this.editButton.addEventListener('click', this.editSegment);
    this.removeButton.addEventListener('click', this.removeSegment);
  }

  public removeListeners(): void {
    this.editButton.removeEventListener('click', this.editSegment);
    this.removeButton.removeEventListener('click', this.removeSegment);
  }

  public connectedCallback(): void {
    this.guid = crypto.randomUUID();

    this.addListeners();
    this.update();
  }

  public disconnectedCallback(): void {
    this.removeListeners();
  }
}

window.customElements.define('templette-segment', TempletteSegment);

export default TempletteSegment;
