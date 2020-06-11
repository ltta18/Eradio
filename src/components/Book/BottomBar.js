import React from 'react';
import { useLocation } from 'react-router-dom';

const BottomBar = (props) => {
  const { chapterData, book } = props;
  const location = useLocation();

  return (
    <div className={location.pathname === '/quiz' ? 'show-none' : undefined}>
      <div id="chapter-progress-bar">
        <div id="chapter-progress-finished"></div>
      </div>
      <div id="bottom-bar" className="show-flex">
        <div id="chapter-progress-text">
          {'Chương '+ String(parseInt(chapterData.chapter.id)+1) + '/' + book.directory.length}
        </div>
        <div className="audio-bar">
          <audio crossOrigin="true">
            <source src={chapterData.audio} type="audio/mpeg" autoPlay></source>
          </audio>
        </div>
      </div>
    </div>
  )
}

export default BottomBar; 