import React from 'react';
import history from '../../../history';


class Category extends React.Component {
  
  onClick = (e) => {
    history.push('/components');
  }

  render() {
      return (
        <div className="column">
            <a className="category remove-underline show-flex" onClick={this.onClick}>
              <div className="category-icon"></div>
              <div className="category-text show-flex">{this.props.category ? this.props.category.name : '//Category Here'}</div>
            </a>
        </div>
      )
  }
}


export default Category;