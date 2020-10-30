import React from 'react';
import history from '../../history';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccessToken } from 'api/Reducer/AuthReducer';
import { fetchBook } from 'api/Action/Book/BookDirectoryAction';

const ControlButtonBar = (props) => {
  const { chapter_id, book, handleGetQuiz, book_id } = props
  const location = useLocation()
  const dispatch = useDispatch()
  // const token = useSelector(selectAccessToken)
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDQwNTUwMzYsImlhdCI6MTYwNDA1MTQzMSwic3ViIjoyfQ.oFs49DjykyDmIjvsKAYpxPW9GxxfbnWPcn7CGTepS2Y'

  const handleBackButton = () => {
    if (chapter_id) {
      var previousChapter = String(parseInt(chapter_id)-1);
      history.push(`./${previousChapter}`)
    }
    else {
      var lastChapter = String(parseInt(book.directory.length)-1)
      history.push(`/book/${book_id}/chapter/${lastChapter}`)
    }
  }

  const handleNextButton = () => {
    var nextChapterId = String(parseInt(chapter_id)+1);
    history.push(`./${nextChapterId}`)
  }

  const handleSubmitQuiz = () => {
      history.push(`/book/result/${book_id}`)
  }

  const handleGetBook = async() => {
    var nextBookId = String(parseInt(book_id)+1)
    const book = await dispatch(fetchBook(nextBookId, token))
    if (book) {
      const currentChapter = book.data.book_progress
      history.push(`/book/${nextBookId}/chapter/${currentChapter}`)
    }
    
  }

  const isFirstChapter = () => {
    if (chapter_id !== String(0)) {
      return (
        <div id="back-button" className="small-text show-flex" onClick={handleBackButton}>
          <div id="back-button-icon"></div>Chương trước
        </div>
      )
    }
  }

  const isLastChapter = () => {
    var content;
    var method;
    if (!chapter_id) {
      content = 'Sách tiếp theo';
      method = handleGetBook
    }
    else if (chapter_id !== String(parseInt(book.directory.length)-1)) {
      content = 'Chương sau';
      method = handleNextButton
    } else if (chapter_id !== String(book.directory.length)) {
      content = 'Quiz';
      method = handleGetQuiz
    }
    return (
      <div id="next-button" className="small-text show-flex" onClick={method}>
        {content}<div id="next-button-icon"></div>
      </div>
    )
  }

  return (
    location.pathname.split('/')[2] !== 'question'
    ? <div id="chapter-control-button" className="show-flex">
        {isFirstChapter()}
        {isLastChapter()}
      </div>
    : <div className={"grey-18-normal-text orange-button quiz-button"} onClick={handleSubmitQuiz}>
        <span className="signin-signup-button" >Hoàn thành</span>
      </div>
  )
}

export default ControlButtonBar;
