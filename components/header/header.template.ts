const template = document.createElement('template');

template.id = 'templette-header-template';
template.innerHTML = `
  <templette-logo></templette-logo>
  <templette-menu-bar></templette-menu-bar>
`;

export default template;
