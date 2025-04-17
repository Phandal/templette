const template = document.createElement('template');

template.id = 'templette-header-template';
template.innerHTML = `
  <header class="header">Templette</header>
  <div id="menu-bar">
    <button id="save">Save</button>
  </div>
`;

export default template;
