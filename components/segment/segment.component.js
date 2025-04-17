import template from './segment.template.js';

class TempletteSegment extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    this.segmentContent = node.querySelector('.segment-content');
    this.segmentContent.textContent = 'Test Segment';

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);
  }
}

window.customElements.define('templette-segment', TempletteSegment);

export default TempletteSegment;
