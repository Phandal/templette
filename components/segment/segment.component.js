import template from './segment.template.js';

class TempletteSegment extends HTMLElement {
  /** @type HTMLUListElement */
  segmentContent;

  constructor() {
    super();

    const node = document.importNode(template.content, true);

    const segmentContent = /** @type HTMLUListElement */ (
      node.querySelector('li.segment-content')
    );
    if (!segmentContent) {
      throw new Error('missing expected fields on the segment template');
    }
    this.segmentContent = segmentContent;

    this.segmentContent.textContent = 'Test Segment';

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(node);
  }
}

window.customElements.define('templette-segment', TempletteSegment);

export default TempletteSegment;
