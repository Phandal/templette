import globalStyles from '../../styles/global.constructable.js';
import type TempletteElement from '../element/element.component.js';
import localStyles from './segment.constructable.js';
import template from './segment.template.js';

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
    shadow.adoptedStyleSheets = [globalStyles, localStyles];
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
