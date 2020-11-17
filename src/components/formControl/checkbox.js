import React from 'react'

// For checkboxes in filterbyfuel types

export const CheckBox = props => {
return(
      <li>
        <input key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
      </li>
  )
}
export default CheckBox