const template = document.createElement('template');

template.id = 'templette-menu-bar-template';
template.innerHTML = /* html */ `
  <div>
    <button class='templette-save'>Save</button>
    <button class='templette-load'>Load</button>
    <button class='templette-clear'>Clear</button>
    <button class='tepmlette-process'>Serialize</button>
  </div>
`;

export default template;
