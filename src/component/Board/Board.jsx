import React, { useState } from "react";
import '../Board/Board.css';
import { Trash2 } from "react-feather";
import { Card } from "../Card/Card";
import { Edititem } from "../Edititem/Edititem";


export const Board = (props) => {

    const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          <Trash2 onClick={() => props.removeBoard()}/>
          {/* {showDropdown && (
            <DropDown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p >Delete Board</p>
            </DropDown>
          )} */}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Edititem
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}
