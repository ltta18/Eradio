import React from 'react';
import history from '../../history';

const ChapterBar = (props) => {
  const { book, chapters, handleGetChapter } = props;

  const getIconClass = (chapter) => {
    if (Number(chapter.id) === Number(chapters.chapter.id)) {
      return "current-read-button"
    } else if (Number(chapter.id) > Number(book.book_progress)) {
      return "not-yet-read-button"
    } else if (Number(chapter.id) < Number(book.book_progress)) {
      return "completed-read-button"
    } else {
      return "";
    }
  }

  const handleGetQuiz = () => {
    history.push('/quiz')
  }

  return (
    <div id="chapter-list">
      {book.directory.map((chapter) => {
        return (
          <div>
            <div id={'book'+chapter.id} className="chapter show-flex" onClick={handleGetChapter}>
              <div
                id={'book'+chapter.id}
                className={`chapter-status-button ${getIconClass(chapter)}`}
              />
              <div id={'book'+chapter.id} className="chapter-header">
                {chapter.name}
              </div>
            </div>
            <div id={'book'+chapter.id} className="padding-progress-line"></div>
          </div>
        )})}
        <div>
          <div className="chapter show-flex" onClick={handleGetQuiz}>
            <div className={String(parseInt(book.directory.length)+1) === chapters.chapter.id
                                      ? "chapter-status-button current-read-button"
                                      : "chapter-status-button not-yet-read-button"}>
                                    
            </div>
            <div className="chapter-header">Quiz</div>
          </div>
          <div className="padding-progress-line"></div>
        </div>
        <div id="chapter-list-progress-line"></div>
    </div>
  )
}

export default ChapterBar;