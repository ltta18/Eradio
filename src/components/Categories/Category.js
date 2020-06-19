import React from 'react';
import history from '../../history';


const Category = (props) => {
  
  const onClick = () => {
    history.push('/components');
  }

  return (
    <div className="column">
        <div className="category show-flex" onClick={onClick}>
          <div className="category-icon"></div>
          <div className="grey-18-normal-text category-text show-flex">{props.category ? props.category.name : '//Category Here'}</div>
        </div>
    </div>
  )
}


export default Category;