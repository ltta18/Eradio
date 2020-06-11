import React from 'react';
import Book from './Book';
import Loading from '../Common/Loading';

const ListBook = (props) => {
  return (
    <div className="list-book">
      {props.isLoading
        ? <Loading />
        : props.library.map((book) => {
            return <Book book={book} /> }) 
        }
    </div>
  ) 
}

export default ListBook;
