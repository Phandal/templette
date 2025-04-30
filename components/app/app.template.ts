const template = document.createElement('template');

template.id = 'templette-app-template';
template.innerHTML = /* html */ `
  <section class="app">
    <templette-builder></templette-builder>
    <templette-builder-editor></templette-builder-editor>
  </section>
`;

export default template;
