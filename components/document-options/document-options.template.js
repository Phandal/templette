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

export default template;
