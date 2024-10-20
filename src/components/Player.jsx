import React, { useState } from "react";

function Player({ initialname, symbol, isSelect, onChangeName }) {
  const [isEditing, setisEditing] = useState(false);
  function handleClick() {
    setisEditing((editing) => !editing);
  }

  const [playerName, setPlayerName] = useState(initialname);
  function handleChange(e) {
    setPlayerName(e.target.value);

    // onChangeName(symbol, playerName)
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  let eidtablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    eidtablePlayerName = (
      <input
        type="text"
        placeholder="You Name"
        required
        value={playerName}
        onChange={handleChange}
      />
    );
  }
  return (
    <li className={isSelect ? "active" : undefined}>
      <span className="player">
        {eidtablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
