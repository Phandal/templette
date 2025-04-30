const template = document.createElement('template');

template.id = 'templette-sidecard-template';
template.innerHTML = /* html */ `
<div>
  <p>options go here</p>
  <button class="close">X</button>
</div>
`;

export default template;
