const template = document.createElement('template');

template.id = 'templette-builer-template';
template.innerHTML = /* html */ `
  <div class="document">
    <div class="operations">
      <button id="add-segment">Add Segment</button>
    </div>
    <div class="document-options">
      <label for="version">Version</label>
      <input name="version" placeholder="1.0.0"></input>
      <label for="name">Name</label>
      <input name="name"></input>
      <label for="element">Element Seperator</label>
      <input name="element"></input>
      <label for="segment">Segment Seperator</label>
      <input name="segment"></input>
      <label for="component">Component Seperator</label>
      <input name="component"></input>
      <label for="repetition">Repetition Seperator</label>
      <input name="repetition"></input>
    </div>
    <ul id="segment-list"></ul>
  </div
`;

export default template;
