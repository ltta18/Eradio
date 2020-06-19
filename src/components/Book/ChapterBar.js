import React from 'react';

const ChapterBar = (props) => {
  const { book, chapters, handleGetChapter, handleGetQuiz, chapterId } = props;

  const getIconClass = (chapter) => {
    if (Number(chapter.id) === Number(chapterId)) {
      return "current-read-button"
    } else if (Number(chapter.id) > Number(book.book_progress)) {
      return "not-yet-read-button"
    } else if (Number(chapter.id) <= Number(book.book_progress)) {
      return "completed-read-button"
    } else {
      return "";
    }
  }

  return (
    <div id="chapter-list">
      {book.directory.map((chapter) => {
        return (
          <div key={chapter.id}>
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
            <div className={!chapterId
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