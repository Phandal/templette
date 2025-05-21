import globalStyle from '../styles/global.js';

// Template
const template = document.createElement('template');
template.id = 'templette-element-template';
template.innerHTML = /* html */ `
<li class="element-content">
  <p class="element-name"></p>
  <div class="element-actions">
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
    grid-template-columns: 5fr 1fr;
    background-color: var(--clr-grey);
  }

  div.element-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`);

class TempletteElement extends HTMLElement {
  public guid = '';
  public name = '';
  public value = '';
  public elementAttributes?: ElementRuleAttribute;

  public elementNameParagraph: HTMLParagraphElement;
  public editButton: HTMLButtonElement;
  public removeButton: HTMLButtonElement;

  constructor() {
    super();
    this.name = 'New Element';

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    this.elementNameParagraph = <HTMLParagraphElement>(
      node.querySelector('p.element-name')
    );

    this.editButton = <HTMLButtonElement>node.querySelector('button.edit');
    this.removeButton = <HTMLButtonElement>node.querySelector('button.remove');

    this.editElement = this.editElement.bind(this);
    this.removeElement = this.removeElement.bind(this);

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  public getElement(): ElementRule {
    return {
      name: this.name,
      value: this.value,
      attributes: this.elementAttributes,
    };
  }

  public setElement(rule: ElementRule): void {
    this.name = rule.name;
    this.value = rule.value;
    this.elementAttributes = rule.attributes;

    this.update();
  }

  public editElement(): void {
    this.dispatchEvent(
      new CustomEvent<EditElement>('edit-element', {
        detail: {
          id: this.guid,
        },
      }),
    );
  }

  public removeElement(): void {
    this.dispatchEvent(
      new CustomEvent<RemoveElement>('remove-element', {
        detail: { id: this.guid },
      }),
    );

    this.remove();
  }

  public update(): void {
    this.elementNameParagraph.textContent = this.name;
  }

  public addListners(): void {
    this.editButton.addEventListener('click', this.editElement);
    this.removeButton.addEventListener('click', this.removeElement);
  }

  public removeListeners(): void {
    this.editButton.removeEventListener('click', this.editElement);
    this.removeButton.removeEventListener('click', this.removeElement);
  }

  public connectedCallback(): void {
    this.guid = crypto.randomUUID();

    this.addListners();
    this.update();
  }

  public disconnectedCallback(): void {
    this.removeListeners();
  }
}

window.customElements.define('templette-element', TempletteElement);

export default TempletteElement;
