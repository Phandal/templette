const template = document.createElement('template');

template.id = 'templette-segment-list-template';
template.innerHTML = /* html */ `
  <div class="segment-operations">
    <button class="segment-list-add">Add Segment</button>
  </div>
  <div class="overflow-list" style="overflow-y:scroll;height: 50vh; border: 1px solid black;">
    <ul class="templette-segment-list"></ul>
  </div>
`;

export default template;
