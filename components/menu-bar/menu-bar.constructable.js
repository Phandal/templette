const sheet = new CSSStyleSheet();

sheet.replaceSync(/* css */ `
  div {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    background-color: var(--clr-black);
  }

  div button {
    background-color: var(--clr-button);
    color: var(--clr-white);
    border-radius: 4px;
    border-style: none;
  }
`);

export default sheet;
