const template = document.createElement('template');

template.id = 'templette-segment-list-template';
template.innerHTML = /* html */ `
  <div class="segment-operations">
    <button class="segment-list-add">Add Segment</button>
  </div>
  <div class="overflow-list">
    <ul class="templette-segment-list"></ul>
  </div>
  <templette-sidecard state="closed"></templette-sidecard>
`;

export default template;
