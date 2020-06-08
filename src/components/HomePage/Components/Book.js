import React from 'react';
import history from '../../../history';


class Book extends React.Component {
  handleClickBook = (book_id) => {
    history.push(`/book/${book_id}/chapter/0`);
  }

  render() {
    return (
      <div className="book">
        <img src={this.props.book.image} className="book-cover" alt="book-cover"></img>
        <div className="book-tag-content">
          <div className="book-info">
            <div className="book-title grey-18-normal-text">{this.props.book.name}</div>
            <div className="book-author">{this.props.book.author}</div>
            <div className="book-estimated-time show-flex">
              <div className="book-estimated-time-icon"></div>
              <div className="book-estimated-time-content">{this.props.book.time}</div>
            </div>
            <div className="book-progress show-flex">
              <div className="book-progress-icon"></div>
              <div className="book-progress-content">{'Đã hoàn thành '+this.props.book.progress+' chương'}</div>
            </div>
          </div>
          <div className="read-button">
            <div className="read-button-container">
              <div className="read-button-content" onClick={() => this.handleClickBook(this.props.book.id)}>Đọc ngay</div>
            </div>
          </div>
        </div>
      </div>
    ) 
  }
}


export default Book;

