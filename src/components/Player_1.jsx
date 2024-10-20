import React, { useState } from "react";

function Player_1({ Players, symbol }) {
  const [isEditing, setisEditing] = useState(false);
  function handleEditClick() {
    setisEditing(true);
  }
  let typeField = <input type="text" placeholder="Your Name" />;
  return (
    <li>
      <span className="player">
        <span className={!isEditing && "player-name"}>
          {isEditing ? typeField : Players}
        </span>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player_1;
