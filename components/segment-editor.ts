import globalStyle from '../styles/global.js';
import type TempletteInput from './input.js';
import type TempletteElementList from './element-list.js';
import type TempletteSegmentList from './segment-list.js';
import type TempletteSegment from './segment.js';

// Template
const template = document.createElement('template');

template.id = 'templette-segment-editor-template';
template.innerHTML = /* html */ `
  <templette-input name="Name" type="text"></templette-input>
  <templette-input name="Container" type="checkbox"></templette-input>
  <templette-input name="Trim" type="checkbox"></templette-input>
  <templette-input name="Ignore" type="text"></templette-input>
  <templette-repetition></templette-repetition>
  <templette-filter></templette-filter>
  <div style="height: 20%;">
    <templette-segment-list></templette-segment-list>
  </div>
  <div style="height: 20%;">
    <templette-element-list></templette-element-list>
  </div>
  <!-- TODO<templette-closerule></templette-closerule> -->
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

class TempletteSegmentEditor extends HTMLElement {
  public nameInput: TempletteInput;
  public containerInput: TempletteInput;
  public ignoreInput: TempletteInput;
  public trimInput: TempletteInput;
  public elementList: TempletteElementList;
  public childrenList: TempletteSegmentList;

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
    this.containerInput = <TempletteInput>(
      node.querySelector('templette-input[name="Container"]')
    );
    this.ignoreInput = <TempletteInput>(
      node.querySelector('templette-input[name="Ignore"]')
    );
    this.trimInput = <TempletteInput>(
      node.querySelector('templette-input[name="Trim"]')
    );
    this.elementList = <TempletteElementList>(
      node.querySelector('templette-element-list')
    );
    this.childrenList = <TempletteSegmentList>(
      node.querySelector('templette-segment-list')
    );
    this.closeButton = <HTMLButtonElement>node.querySelector('button.close');
    this.saveButton = <HTMLButtonElement>node.querySelector('button.save');

    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);

    this.shadow.adoptedStyleSheets = [globalStyle, localStyle];
    this.shadow.append(node);
  }

  public loadSegment(segment: TempletteSegment): void {
    const rule = segment.getSegment();
    this.nameInput.setValue(rule.name);
    this.containerInput.setValue(rule.container);
    this.ignoreInput.setValue(rule.ignore);

    for (const child of rule.children) {
      this.childrenList.addSegment(child);
    }

    if (rule.container) {
      // TODO set container specific fields
    } else {
      for (const element of rule.elements) {
        this.elementList.addElement(element);
      }
      this.trimInput.setValue(rule.trim);
    }
  }

  public getSegment(): SegmentRule {
    const children = this.childrenList.getRules();
    const elements = this.elementList.getRules();

    if (this.containerInput.getValue()) {
      return {
        name: <string>this.nameInput.getValue(),
        container: true,
        ignore: <string>this.ignoreInput.getValue(),
        children,
      };
    }

    return {
      name: <string>this.nameInput.getValue(),
      container: false,
      ignore: <string>this.ignoreInput.getValue(),
      trim: <boolean>this.trimInput.getValue(),
      closeRule: undefined, // TODO
      elements,
      children,
    };
  }

  public close(): void {
    this.classList.remove('open');
  }

  public save(): void {
    this.dispatchEvent(
      new CustomEvent<UpdateSegment>('update-segment', {
        detail: {
          rule: this.getSegment(),
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

  public connectedCallback(): void {
    this.addListeners();
  }

  public disconnectedCallback(): void {
    this.removeListeners();
  }
}

window.customElements.define(
  'templette-segment-editor',
  TempletteSegmentEditor,
);

export default TempletteSegmentEditor;
