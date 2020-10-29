import React, { useState, useEffect } from 'react';
import { withRouter, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GreenAudioPlayer from 'green-audio-player';
import { fetchChapter } from 'api/Action/Book/ChapterAction'
import { fetchBook } from 'api/Action/Book/BookDirectoryAction'
import Loading from 'components/Common/Loading';
import history from '../../history';
import ChapterBar from './ChapterBar';
import BottomBar from './BottomBar';
import QuizContent from './QuizContent';
import ControlButtonBar from './ControlButtonBar';
import { selectAccessToken } from 'api/Reducer/AuthReducer';

const BookZoom = (props) => {
  const [ book, setBook ] = useState({ directory: [], book_progress: '' });
  const [ chapterData, setChapterData ] = useState({ chapter: {text: []} });
  const [ isLoading, setIsLoading ] = useState(false);

  const params = useParams();
  const location = useLocation();
  // const token = useSelector(selectAccessToken)
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDM5NjM0MTcsImlhdCI6MTYwMzk1OTgxMiwic3ViIjoyfQ._ByHsH0mMdz5A_SpAZw3enXp1ECO27ERZKrRTsMhh8g'
  const { book_id, chapter_id } = params;
  const pathname = location.pathname.split('/')[2]

  const dispatch = useDispatch();

  useEffect(() => {
    const getChapter = async () => {
      setIsLoading(true);
      let chapter;
      if (chapter_id !== undefined) {
        chapter = await dispatch(fetchChapter(book_id, chapter_id, token));
      }
      const book = await dispatch(fetchBook(book_id, token));
      if (!!book) {
        setBook(book.data);
      }
      if (!!chapter) {
        setChapterData(chapter.data);
      }
      setIsLoading(false);
    }
    
    getChapter()
    
    if (chapter_id) {
      var chapter_progress = document.getElementById('chapter-progress-finished');
      chapter_progress.style.width = String((parseInt(book.book_progress)+1)/(book.directory.length)*100)+'%';
    }
  }, [dispatch, book_id, chapter_id, token])

  useEffect (() => {
    const handleNextChapter = () => {
      var next = parseInt(chapter_id)+1
      if (next >= book.directory.length) {
        handleGetQuiz()
      }
      else {
        var next_chapter_num = String(next);
        history.push(`./${next_chapter_num}`)
      }
    }

    if (!isLoading) {
      if (chapter_id) {
        new GreenAudioPlayer('.audio-bar');
      }
      
      var audio = document.getElementById('audio')
      if(audio) {
        audio.addEventListener('ended', handleNextChapter)
      }
    }
  }, [isLoading])

  const handleClickOutsideVolume = () => {
    if (chapter_id) {
      var volume_button = document.getElementsByClassName('volume__button').item(0);
      var volume_controls = document.getElementsByClassName('volume__controls').item(0);
      volume_button.classList.remove('open');
      volume_button.setAttribute('aria-label','Open Volume Controls');
      volume_controls.classList.add('hidden')
    }
  }

  const handleClickChapter = () => {
    var chapter_list = document.getElementById('chapter-list-show');
    var progress_line = document.getElementById('chapter-list-progress-line');
    var filter = document.getElementById('filter');
    var outside_chapter_list = document.getElementById('book-zoom-body');
    var chapter_list_container = document.getElementById('chapter-list-container');

    if (chapter_list.classList.contains('chapter-list-hide')) {
      chapter_list.setAttribute('class','chapter-list-show');
      progress_line.style.position = 'fixed';
      filter.classList.remove('show-none');
      filter.style.position = 'absolute';
      outside_chapter_list.classList.add('book-zoom-body-left-open');
      chapter_list_container.style.paddingRight = '16px';
    }
    else {
      progress_line.style.position = '';
      chapter_list.setAttribute('class','chapter-list-hide');
      handleClickOutsideChapterList();
    }
  }

  const handleClickHouseIcon = () => {
    history.push('/components')
  }

  const handleClickOutsideChapterList = () => {
    const chapter_list = document.getElementById('chapter-list-show');
    const filter = document.getElementById('filter');
    const outside_chapter_list = document.getElementById('book-zoom-body');
    const progress_line = document.getElementById('chapter-list-progress-line')

    chapter_list.style.position = '';
    chapter_list.setAttribute('class','chapter-list-hide');
    filter.classList.add('show-none');
    filter.style.position = '';
    outside_chapter_list.classList.remove('book-zoom-body-left-open');
    progress_line.style.position = ''
  }

  const handleGetChapter = (e) => {
    const target_id = e.target.id.substring(4,5)
    history.push(`/book/${book_id}/chapter/${target_id}`)
    handleClickOutsideChapterList()
  };

  const handleGetQuiz = () => {
    history.push(`/book/question/${book_id}`)
    handleClickOutsideChapterList()
  };

  const handleScroll = (e) => {
    var progress_line = document.getElementById('chapter-list-progress-line');
    var scroll_position = document.getElementById('chapter-list-container').scrollTop
    if (scroll_position >= 50) {
      progress_line.style.top = '0px';
    } else {
      progress_line.style.top = '50px';
    }
  };
  
  return (
    <div id="book-zoom">
      {isLoading
      ? <Loading /> 
      :<div>
        <div id="chapter-list-show" className="chapter-list-hide">
        <div id="chapter-list-container" className="show-flex" onScroll={handleScroll}>
            <div className="chapter-icon" onClick={handleClickChapter}></div>
            <ChapterBar book={book} chapters={chapterData} handleGetChapter={handleGetChapter} handleGetQuiz={handleGetQuiz} chapterId={chapter_id}/>
          </div>
        </div>

        <div id="filter" className="filter show-none" onClick={handleClickOutsideChapterList}></div>
        
        <div id="book-zoom-body" className="show-flex" onClick={handleClickOutsideVolume}>
          <div id="book-zoom-menu-bar">
            <div className="chapter-icon" onClick={handleClickChapter}></div>
            <div id="house-icon-container" onClick={handleClickHouseIcon}><div id="house-icon"></div></div>
          </div>

          <div id="book-content">
            <div id="book-chapter-heading" className={pathname === 'result' ? 'text-center' : ''}>
              
              {pathname === 'question' 
              ? "Câu hỏi trắc nghiệm" 
              : pathname === 'result' 
              ? "Kết quả"
              : chapterData.chapter.name
              }
              </div>
            <div className="book-chapter-text small-text">
              {!chapter_id 
              ? <QuizContent/> 
              : chapterData.chapter.text.map((paragraph) => {
                return <div key={paragraph} className="book-chapter-text-paragraph">{paragraph}</div>
              })
              }
            </div>

            <ControlButtonBar book={book} chapter_id={chapter_id} book_id={book_id} handleGetQuiz={handleGetQuiz}/>
            
          </div>
        </div>
        {chapter_id 
        ? <BottomBar book={book} chapterData={chapterData} /> 
        : undefined
        }
      </div>
    }
  </div>
    
  )
}


export default withRouter(BookZoom);