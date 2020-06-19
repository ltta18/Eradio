import React from 'react';

const BottomBar = (props) => {
  const { chapterData, book } = props;

  return (
    <div>
      <div id="chapter-progress-bar">
        <div id="chapter-progress-finished"></div>
      </div>
      <div id="bottom-bar" className="show-flex">
        <div id="chapter-progress-text">
          {'Chương '+ String(parseInt(chapterData.chapter.id)+1) + '/' + book.directory.length}
        </div>
        <div className="audio-bar">
          <audio id='audio' autoPlay>
            <source src={chapterData.chapter.audio} type="audio/mpeg"></source>
          </audio>
        </div>
      </div>
    </div>
  )
}

export default BottomBar; 