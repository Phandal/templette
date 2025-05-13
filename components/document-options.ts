import globalStyle from '../styles/global.js';
import type TempletteInput from './input.js';

// Template
const template = document.createElement('template');
template.id = 'templette-document-options-template';
template.innerHTML = /* html */ `
  <templette-input type="text" name="Name"></templette-input>
  <templette-input type="text" name="Version"></templette-input>
  <templette-input type="text" name="Element"></templette-input>
  <templette-input type="text" name="Segment"></templette-input>
  <templette-input type="text" name="Component"></templette-input>
  <templette-input type="text" name="Repetition"></templette-input>
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

  templette-input[name="Name"] {
    grid-column-span: 3;
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
      name: <string>this.name.getValue(),
      version: <string>this.version.getValue(),
      elementSeparator: <string>this.element.getValue(),
      segmentSeparator: <string>this.segment.getValue(),
      componentSeparator: <string>this.component.getValue(),
      repetitionSeparator: <string>this.repetition.getValue(),
    };
  }

  public setOptions(templ?: Template): void {
    if (templ) {
      this.name.setValue(templ.name);
      this.version.setValue(templ.version);
      this.element.setValue(templ.elementSeparator);
      this.segment.setValue(templ.segmentSeparator);
      this.component.setValue(templ.componentSeparator);
      this.repetition.setValue(templ.repetitionSeparator);
    } else {
      this.name.setValue('');
      this.version.setValue('');
      this.element.setValue('');
      this.segment.setValue('');
      this.component.setValue('');
      this.repetition.setValue('');
    }
  }
}

window.customElements.define(
  'templette-document-options',
  TempletteDocumentOptions,
);

export default TempletteDocumentOptions;
