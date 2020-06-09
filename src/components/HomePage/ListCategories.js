import React from 'react';
import Category from './Category';


class ListCategories extends React.Component {
    render() {
        return (
          <div className="list-categories-container">
            <div className="list-categories">
              <div className="row">
                {this.props.categories ? 
                  this.props.categories.map(category => {
                    return <Category icon={category.icon} category={category} />
                  }) : 
                  ''
                }
              </div>
            </div>
          </div>
        )
    }
}


export default ListCategories;