// Template
const template = document.createElement('template');
template.id = 'templette-element-template';
template.innerHTML = /* html */ `
<p>Element Content</p>
`;

class TempletteElement extends HTMLElement {
  private name: string;
  private value: string;
  private elementAttributes: ElementRuleAttribute;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    this.name = '';
    this.value = '';
    this.elementAttributes = {};

    shadow.append(node);
  }

  public getElement(): ElementRule {
    return {
      name: this.name,
      value: this.value,
      attributes: this.elementAttributes,
    };
  }
}

window.customElements.define('templette-element', TempletteElement);

export default TempletteElement;
