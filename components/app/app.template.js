const template = document.createElement('template');

template.id = 'templette-app-template';
template.innerHTML = /* html */ `
  <section class="app">
    <templette-builder></templette-builder>
    <templette-data></templette-data>
  </section>
`;

export default template;
