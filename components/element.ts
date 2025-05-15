import globalStyle from '../styles/global.js';

// Template
const template = document.createElement('template');
template.id = 'templette-element-template';
template.innerHTML = /* html */ `
<li class="element-content">
  <p>Element Content</p>
</li>
`;

// Style
const localStyle = new CSSStyleSheet();
localStyle.replaceSync(/* css */ `
  li {
    list-style: none;
    border: 1px solid var(--clr-black);
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    background-color: var(--clr-grey);
  }
`);

class TempletteElement extends HTMLElement {
  public guid = '';
  public name = '';
  public value = '';
  public elementAttributes?: ElementRuleAttribute;

  constructor() {
    super();

    const node = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });

    this.elementAttributes = {};

    shadow.adoptedStyleSheets = [globalStyle, localStyle];
    shadow.append(node);
  }

  public getElement(): ElementRule {
    return {
      name: this.name,
      value: this.value,
      attributes: this.elementAttributes,
    };
  }

  public setElement(rule: ElementRule): void {
    this.name = rule.name;
    this.value = rule.value;
    this.elementAttributes = rule.attributes;
  }

  public connectedCallback(): void {
    this.guid = crypto.randomUUID();
  }
}

window.customElements.define('templette-element', TempletteElement);

export default TempletteElement;
