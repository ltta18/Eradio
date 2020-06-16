import React from 'react';
import { useParams } from 'react-router-dom';

const BottomBar = (props) => {
  const { chapterData, book } = props;
  const params = useParams();
  const { chapter_id } = params;

  return (
    <div className={!chapter_id ? 'show-none' : undefined}>
      <div id="chapter-progress-bar">
        <div id="chapter-progress-finished"></div>
      </div>
      <div id="bottom-bar" className="show-flex">
        <div id="chapter-progress-text">
          {'Chương '+ String(parseInt(chapterData.chapter.id)+1) + '/' + book.directory.length}
        </div>
        <div className="audio-bar">
          <audio crossOrigin="true">
            <source src={chapterData.chapter.audio} type="audio/mpeg" autoPlay></source>
          </audio>
        </div>
      </div>
    </div>
  )
}

export default BottomBar; 