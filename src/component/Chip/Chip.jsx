import React, { useState } from "react";
import { X } from "react-feather";
import '../Chip/Chip.css';

export const Chip = (props) => {

    const [show,setShow] = useState(true);

    return(
        <>
        <div className="chip" style={{backgroundColor:props?.color}}>
            {props.text}
            {props?.close && <X onClick={()=>(props.onClose ? props.onClose() : "")}/>}
        </div>
        </>
    );
}