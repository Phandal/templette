const template = document.createElement('template');

template.id = 'templette-builder-template';
template.innerHTML = /* html */ `
  <templette-document-options></templette-document-options>
  <templette-segment-list></templette-segment-list>
`;

export default template;
