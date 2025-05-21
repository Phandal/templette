import globalStyle from '../styles/global.ts';
import TempletteElementEditor from './element-editor.ts';
import TempletteElement from './element.ts';

// Template
const template = document.createElement('template');
template.id = 'templette-element-list-template';
template.innerHTML = /* html */ `
<button class="element-list-add">Add Element</button>
<div class="overflow-list">
<ul class="templette-element-list"></ul>
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

  ul.templette-element-list {
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

class TempletteElementList extends HTMLElement {
  public shadow: ShadowRoot;
  public list: HTMLUListElement;
  public addButton: HTMLButtonElement;

  private elements: TempletteElement[] = [];

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    this.shadow = this.attachShadow({ mode: 'open' });

    this.addButton = <HTMLButtonElement>(
      node.querySelector('button.element-list-add')
    );
    this.list = <HTMLUListElement>node.querySelector('ul');

    this.addElementListener = this.addElementListener.bind(this);
    this.removeElementListener = this.removeElementListener.bind(this);
    this.editElementListener = this.editElementListener.bind(this);

    this.shadow.adoptedStyleSheets = [globalStyle, localStyle];
    this.shadow.append(node);
  }

  public getRules(): ElementRule[] {
    return this.elements.map((element) => {
      return element.getElement();
    });
  }

  public addElement(rule?: ElementRule): void {
    const elementComponent = new TempletteElement();

    elementComponent.addEventListener('edit-element', this.editElementListener);
    elementComponent.addEventListener(
      'remove-element',
      this.removeElementListener,
    );
    this.elements.push(elementComponent);
    this.list.append(elementComponent);

    if (rule) {
      elementComponent.setElement(rule);
    }
  }

  public addElementListener(_ev: Event): void {
    this.addElement();
  }

  public removeElementListener(ev: Event): void {
    const customEvent = <CustomEvent<RemoveElement>>ev;

    this.elements = this.elements.filter((element) => {
      return element.guid !== customEvent.detail.id;
    });
  }

  public editElementListener(ev: Event): void {
    const customEvent = <CustomEvent<EditElement>>ev;

    const element = this.elements.find((element) => {
      return element.guid === customEvent.detail.id;
    });
    if (!element) {
      console.warn(
        `could not find element with guid '${customEvent.detail.id}'`,
      );
      return;
    }

    const elementEditor = new TempletteElementEditor();
    elementEditor.addEventListener(
      'update-element',
      this.updateElement(element),
    );
    elementEditor.loadElement(element);

    this.shadow.append(elementEditor);
    requestAnimationFrame(() => {
      elementEditor.classList.add('open');
    });
  }

  public updateElement(element: TempletteElement): (ev: Event) => void {
    return (ev: Event) => {
      const customEvent = <CustomEvent<UpdateElement>>ev;
      const rule = customEvent.detail.rule;
      element.setElement(rule);
    };
  }

  public addListeners(): void {
    this.addButton.addEventListener('click', this.addElementListener);
  }

  public removeListeners(): void {
    this.addButton.removeEventListener('click', this.addElementListener);
  }

  public connectedCallback(): void {
    this.addListeners();
  }

  public disconnectedCallback(): void {
    this.removeListeners();
  }
}

window.customElements.define('templette-element-list', TempletteElementList);

export default TempletteElementList;
