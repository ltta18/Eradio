import React from 'react';
import history from '../../history';

const ControlButtonBar = (props) => {
  const { chapter_id, chapterData, book } = props

  const handleBackButton = () => {
    var previous_chapter_num = String(parseInt(chapterData.chapter.id)-1);
    history.push(`./${previous_chapter_num}`)
  }

  const handleNextButton = () => {
    var next_chapter_num = String(parseInt(chapterData.chapter.id)+1);
    history.push(`./${next_chapter_num}`)
  }

  const handleSubmitQuiz = () => {
    history.push('./result')
  }

  const isFirstChapter = () => {
    if (chapterData.chapter.id !== String(0)) {
      return (
        <div id="back-button" className="show-flex" onClick={handleBackButton}>
          <div id="back-button-icon"></div>Chương trước
        </div>
      )
    }
  }

  const isLastChapter = () => {
    if (chapterData.chapter.id !== String(parseInt(book.directory.length)-1)) {
      return (
        <div id="next-button" className="show-flex" onClick={handleNextButton}>
          Chương sau<div id="next-button-icon"></div>
        </div>
      )
    }
  }

  return (
    !chapter_id
    ? <div className={"orange-button"} onClick={handleSubmitQuiz}>
        <span className="signin-signup-button" >Hoàn thành</span>
      </div>
    : <div id="chapter-control-button" className="show-flex">
        {isFirstChapter()}
        {isLastChapter()}
      </div>
  )
}

export default ControlButtonBar;