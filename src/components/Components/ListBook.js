import React from 'react';
import Book from './Book';
import { connect } from 'react-redux';
import { fetchGetLibrary } from '../../api/Action/Categories/LibraryAction';
import Loading from '../Common/Loading';

class ListBook extends React.Component {
  render() {
    return (
      <div className="list-book">
        {this.props.is_loading === true 
          ? <Loading />
          : this.props.is_loading === false 
          ? this.props.library.map((book) => {
              return <Book book={book} /> }) 
          : ''
          }
      </div>
    ) 
  }
}

export default connect(null, { fetchGetLibrary })(ListBook);
