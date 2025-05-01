// Template
const template = document.createElement('template');
template.id = 'templette-element-template';
template.innerHTML = /* html */ `
<p>Element Content</p>
`;

class TempletteElement extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.append(node);
  }
}

window.customElements.define('templette-element', TempletteElement);

export default TempletteElement;
