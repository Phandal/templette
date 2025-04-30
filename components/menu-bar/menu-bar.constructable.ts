const sheet = new CSSStyleSheet();

sheet.replaceSync(/* css */ `
  div {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    background-color: var(--clr-black);
    padding: var(--header-padding);
  }

  div button {
    background-color: var(--clr-button);
    color: var(--clr-white);
    border-radius: 4px;
    border-style: none;
    padding: 5px;
  }
`);

export default sheet;
