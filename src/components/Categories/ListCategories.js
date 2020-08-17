import React from 'react';
import Category from './Category';

const ListCategories = (props) => {
  return (
    <div className="list-categories-container">
      <div className="list-categories">
        <div className="row">
          {props.categories ? 
            props.categories.map(category => {
              return <Category key={category.name} icon={category.icon} category={category} />
            }) : 
            ''
          }
        </div>
      </div>
    </div>
  )
}


export default ListCategories;