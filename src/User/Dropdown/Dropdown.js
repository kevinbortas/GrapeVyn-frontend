import React, { useState } from "react";
import "User/Dropdown/Dropdown.css";

function Dropdown({ items, multiSelect = false }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  Dropdown.handleClickOutside = () => {
    setOpen(false);
  }

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
        item.onClick();
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    if (selection.some(current => current.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
    <div className="dd-wrapper">
          <ul className="dd-list">
            {items.map(item => (
                <li className="dd-list-item" key={item.id}>
                    <button type="button" onClick={() => handleOnClick(item)} className='DropDownButton'>
                        <img src={item.icon} className="Icon"/>
                        <h3 className="selectorValue">
                        {item.value}
                        </h3>
                    </button>
                </li>
            ))}
          </ul>
    </div>
  );
}

export default Dropdown;