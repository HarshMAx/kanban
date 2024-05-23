import React from "react";
import './Form.css';


 export const Form = (props) => {
        return(
            <div className="Form" onClick={()=>(props.onClose ? props.onClose() : "")}>
                <div className="Form_content custom-scroll" onClick={(event)=>event.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        )
}