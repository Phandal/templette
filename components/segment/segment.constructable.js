const style = new CSSStyleSheet();

style.replaceSync(/* css */ `
  li {
    list-style: none;
    border: 1px solid var(--clr-black);
  }

  li > div {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
  }

  div.segment-counts, div.segment-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`);

export default style;
