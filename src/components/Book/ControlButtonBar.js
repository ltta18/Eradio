import React from 'react';
import history from '../../history';
import { useLocation } from 'react-router-dom';

const ControlButtonBar = (props) => {
  const { chapter_id, chapterData, book, handleGetQuiz } = props
  const location = useLocation()

  const handleBackButton = () => {
    var previous_chapter_num = String(parseInt(chapterData.chapter.id)-1);
    history.push(`./${previous_chapter_num}`)
  }

  const handleNextButton = () => {
    var next_chapter_num = String(parseInt(chapterData.chapter.id)+1);
    history.push(`./${next_chapter_num}`)
  }

  const handleSubmitQuiz = () => {
    // const answerSet = JSON.parse(localStorage.getItem('answerSet'))
    // if (Object.keys(answerSet).length === 5) {
      console.log(book)
      history.push(`/book/result`)
    // }
  }

  const handleReturnLibrary = () => {
    history.push('/components')
  }

  const isFirstChapter = () => {
    if (chapterData.chapter.id !== String(0)) {
      return (
        <div id="back-button" className="small-text show-flex" onClick={handleBackButton}>
          <div id="back-button-icon"></div>Chương trước
        </div>
      )
    }
  }

  const isLastChapter = () => {
    if (chapterData.chapter.id !== String(parseInt(book.directory.length)-1)) {
      return (
        <div id="next-button" className="small-text show-flex" onClick={handleNextButton}>
          Chương sau<div id="next-button-icon"></div>
        </div>
      )
    } else if (chapterData.chapter.id !== String(book.directory.length)) {
      return (
        <div id="next-button" className="small-text show-flex" onClick={handleGetQuiz}>
          Quiz<div id="next-button-icon"></div>
        </div>
      )
    }
  }

  const isQuizPage = () => {
    var message
    var method
    if (location.pathname.split('/')[2] === 'question') {
      message = 'Hoàn thành'
      method = handleSubmitQuiz
    }
    else {
      message = 'Quay lại Trang chủ'
      method = handleReturnLibrary
    }
    return (
      <div className={"grey-18-normal-text orange-button quiz-button"} onClick={method}>
        <span className="signin-signup-button" >{message}</span>
      </div>
    )
  }

  return (
    chapter_id
    ? <div id="chapter-control-button" className="show-flex">
        {isFirstChapter()}
        {isLastChapter()}
      </div>
    : isQuizPage()
  )
}

export default ControlButtonBar;