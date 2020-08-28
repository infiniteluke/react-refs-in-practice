import React, { useRef } from "react";

export default function TextInputWithFocusButton() {
  const inputEl = useRef();
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <>
      <input style={{ width: '500px', fontSize: '3em' }} ref={inputEl} type="text" defaultValue="Howdy! 🤠" />
      <button style={{marginTop: '.6em',padding: '.3em .5em',fontSize: '2em', borderRadius: '20px', backgroundColor: '#4299e1', color: 'white', border: 'none'}} onClick={onButtonClick}>Focus Input</button>
    </>
  );
}
