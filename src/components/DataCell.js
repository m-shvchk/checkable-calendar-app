import React from 'react'
import classes from './DataCell.module.css'

const DataCell = (props) => {

    let checked_class = (props.value ?  `${classes.hour__cell_checked}` : `${classes.hour__cell}`)
    
  return (
    <div className={checked_class} onClick={props.onClick}></div>
  )
}

export default DataCell