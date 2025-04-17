export default TempletteBuilder;
declare class TempletteBuilder extends HTMLElement {
  /** @type {HTMLButtonElement} */
  addSegmentButton: HTMLButtonElement;
  /** @type {HTMLUListElement} */
  listNode: HTMLUListElement;
  addSegment(): void;
  #private;
}
