import globalStyle from '../styles/global.js';
import type TempletteElement from './element.js';
import type TempletteInput from './input.js';

// Template
const template = document.createElement('template');

template.id = 'templette-element-editor-template';
template.innerHTML = /* html */ `
  <templette-input name="Name" type="text"></templette-input>
  <templette-input name="Value" type="text"></templette-input>
  <!-- TODO<templette-element-attribute kind="length"></templette-element-attribute> -->
  <button class="close">Cancel</button>
  <button class="save">Save</button>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100%;
    width: 100%;
    transition: left 0.2s linear;
    z-index: 10;
    background: var(--clr-white);
    box-shadow: 2px 0 5px rgba(0,0,0,0.2);
    border-radius: var(--border-radius);
  }

  :host(.open) {
    left: 0;
  }
`);

class TempletteElementEditor extends HTMLElement {
  public nameInput: TempletteInput;
  public valueInput: TempletteInput;

  private shadow: ShadowRoot;
  public closeButton: HTMLButtonElement;
  public saveButton: HTMLButtonElement;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    this.shadow = this.attachShadow({ mode: 'open' });

    this.nameInput = <TempletteInput>(
      node.querySelector('templette-input[name="Name"]')
    );
    this.valueInput = <TempletteInput>(
      node.querySelector('templette-input[name="Value"]')
    );
    this.closeButton = <HTMLButtonElement>node.querySelector('button.close');
    this.saveButton = <HTMLButtonElement>node.querySelector('button.save');

    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);

    this.shadow.adoptedStyleSheets = [globalStyle, localStyle];
    this.shadow.append(node);
  }

  public loadElement(element: TempletteElement): void {
    const rule = element.getElement();
    this.nameInput.setValue(rule.name);
    this.valueInput.setValue(rule.value);
    // TODO: set attributes here
  }

  public getElement(): ElementRule {
    return {
      name: <string>this.nameInput.getValue(),
      value: <string>this.valueInput.getValue(),
      attributes: undefined, // TODO
    };
  }

  public close(): void {
    this.classList.remove('open');
  }

  public save(): void {
    this.dispatchEvent(
      new CustomEvent<UpdateElement>('update-element', {
        detail: {
          rule: this.getElement(),
        },
      }),
    );
    this.close();
  }

  public remove(): void {
    if (!this.classList.contains('open')) {
      this.parentNode?.removeChild(this);
    }
  }

  public addListeners(): void {
    this.closeButton.addEventListener('click', this.close);
    this.saveButton.addEventListener('click', this.save);
    this.addEventListener('transitionend', this.remove);
  }

  public removeListeners(): void {
    this.closeButton.removeEventListener('click', this.close);
    this.saveButton.removeEventListener('click', this.save);
    this.removeEventListener('transitionend', this.remove);
  }

  public connectedCallback() {
    this.addListeners();
  }

  public disconnectedCallback() {
    this.removeListeners();
  }
}

window.customElements.define(
  'templette-element-editor',
  TempletteElementEditor,
);

export default TempletteElementEditor;
