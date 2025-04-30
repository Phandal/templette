const template = document.createElement('template');

template.id = 'templette-segment-template';
template.innerHTML = /* html */ `
<li class="segment-content">
  <div>
  <p>Segment_Name</p>
    <div class="segment-counts">
      <p class="element-count"># Elements</p>
      <p class="children-count"># Children</p>
    </div>
    <div class="segment-actions">
      <button class="edit">Edit</button>
      <button class="remove">Remove</button>
    </div>
  </div>
</li>
`;

export default template;
