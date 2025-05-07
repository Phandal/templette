import globalStyle from '../styles/global.js';
import type TempletteInput from './input.js';

// Template
const template = document.createElement('template');
template.id = 'templette-document-options-template';
template.innerHTML = /* html */ `
  <templette-input name="Name"></templette-input>
  <templette-input name="Version"></templette-input>
  <templette-input name="Element"></templette-input>
  <templette-input name="Segment"></templette-input>
  <templette-input name="Component"></templette-input>
  <templette-input name="Repetition"></templette-input>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  :host {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    justify-items: center;
    background-color: var(--clr-grey);
    padding: 10px 0px;
    border-radius: var(--border-radius);
  }
`);

class TempletteDocumentOptions extends HTMLElement {
  public name: TempletteInput;
  public version: TempletteInput;
  public element: TempletteInput;
  public segment: TempletteInput;
  public component: TempletteInput;
  public repetition: TempletteInput;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    this.name = <TempletteInput>(
      node.querySelector('templette-input[name="Name"]')
    );
    this.version = <TempletteInput>(
      node.querySelector('templette-input[name="Version"]')
    );
    this.element = <TempletteInput>(
      node.querySelector('templette-input[name="Element"]')
    );
    this.segment = <TempletteInput>(
      node.querySelector('templette-input[name="Segment"]')
    );
    this.component = <TempletteInput>(
      node.querySelector('templette-input[name="Component"]')
    );
    this.repetition = <TempletteInput>(
      node.querySelector('templette-input[name="Repetition"]')
    );

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  public getOptions(): DocumentOptions {
    return {
      name: this.name.getValue(),
      version: this.version.getValue(),
      elementSeparator: this.element.getValue(),
      segmentSeparator: this.segment.getValue(),
      componentSeparator: this.component.getValue(),
      repetitionSeparator: this.repetition.getValue(),
    };
  }
}

window.customElements.define(
  'templette-document-options',
  TempletteDocumentOptions,
);

export default TempletteDocumentOptions;
