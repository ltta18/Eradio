import React from 'react';
import history from '../../history';


const Book = (props) => {
  const handleClickBook = (book_id) => {
    var currentChapter = (Number(props.book.progress.split("/")[0])-1)
    if (currentChapter<0) {
      currentChapter = 0
    }
    history.push(`/book/${book_id}/chapter/${currentChapter}`);
  }

  return (
    <div className="book">
      <img src={props.book.image} className="book-cover" alt="book-cover"></img>
      <div className="book-tag-content">
        <div className="book-info">
          <div className="book-title grey-18-normal-text">{props.book.name}</div>
          <div className="book-author small-text ">{props.book.author}</div>
          <div className="book-estimated-time show-flex">
            <div className="book-estimated-time-icon"></div>
            <div className="book-estimated-time-content small-text">{props.book.time}</div>
          </div>
          <div className="book-progress show-flex">
            <div className="book-progress-icon"></div>
            <div className="book-progress-content small-text">{'Đã hoàn thành '+props.book.progress+' chương'}</div>
          </div>
        </div>
        <div className="read-button">
          <div className="read-button-container">
            <div className="read-button-content" onClick={() => handleClickBook(props.book.id)}>Đọc ngay</div>
          </div>
        </div>
      </div>
    </div>
  ) 
}


export default Book;

