import React, { useState, useEffect } from 'react';
import { withRouter, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GreenAudioPlayer from 'green-audio-player';
import { fetchGetChapter } from 'api/Action/Book/ChapterAction'
import { fetchGetBook } from 'api/Action/Book/BookDirectoryAction'
import Loading from 'components/Common/Loading';
import history from '../../history';
import ChapterBar from './ChapterBar';
import BottomBar from './BottomBar';
import QuizContent from './QuizContent';
import ControlButtonBar from './ControlButtonBar';

const quiz = [['a','b','c','d'], ['aa','bb','cc','dd']]

const BookZoom = (props) => {
  const [ book, setBook ] = useState({ directory: [], book_progress: '' });
  const [ chapterData, setChapterData ] = useState({ chapter: {text: []} });
  const [ isLoading, setIsLoading ] = useState(false);

  const params = useParams();
  const location = useLocation();
  const token = useSelector(state => state.access_token)
  const { book_id, chapter_id } = params;
  const pathname = location.pathname.split('/')[2]

  const dispatch = useDispatch();

  useEffect(() => {
    const getBookChapter = async () => {
      setIsLoading(true);
      const chapter = await dispatch(fetchGetChapter(book_id, chapter_id, token));
      const book = await dispatch(fetchGetBook(book_id, token));
      if (!!book || !!chapter) {
        setBook(book.data);
        setChapterData(chapter.data);
      }
      setIsLoading(false);
    }
    
    if (chapter_id) {
      getBookChapter()
      var chapter_progress = document.getElementById('chapter-progress-finished');
      chapter_progress.style.width = String((parseInt(book.book_progress)+1)/(book.directory.length)*100)+'%';
    }

  }, [chapter_id, token, dispatch])

  useEffect (() => {
    if (!isLoading) {
      new GreenAudioPlayer('.audio-bar');
    }
  }, [isLoading])

  const handleClickOutsideVolume = () => {
    var volume_button = document.getElementsByClassName('volume__button').item(0);
    var volume_controls = document.getElementsByClassName('volume__controls').item(0);
    volume_button.classList.remove('open');
    volume_button.setAttribute('aria-label','Open Volume Controls');
    volume_controls.classList.add('hidden')
  }

  const handleClickChapter = () => {
    var chapter_list = document.getElementById('chapter-list-show');
    var filter = document.getElementById('filter');
    var outside_chapter_list = document.getElementById('book-zoom-body');
    var chapter_list_container =document.getElementById('chapter-list-container');
    if (chapter_list.classList.contains('show-none')) {
      chapter_list.classList.remove('show-none');
      filter.classList.remove('show-none');
      filter.style.position = 'absolute';
      outside_chapter_list.classList.add('book-zoom-body-left-open');
      chapter_list_container.style.paddingRight = chapter_list_container.offsetWidth - chapter_list_container.clientWidth + "px";
    }
    else {
      handleClickOutsideChapterList();
    }
  }

  const handleClickHouseIcon = () => {
    history.push('/components')
  }

  const handleClickOutsideChapterList = () => {
    var chapter_list = document.getElementById('chapter-list-show');
    var filter = document.getElementById('filter');
    var outside_chapter_list = document.getElementById('book-zoom-body');
    chapter_list.style.position = '';
    chapter_list.classList.add('show-none');
    filter.classList.add('show-none');
    filter.style.position = '';
    outside_chapter_list.classList.remove('book-zoom-body-left-open');
  }

  const handleGetChapter = (e) => {
    const target_id = e.target.id.substring(4,5)
    history.push(`./${target_id}`)
  };

  const handleGetQuiz = () => {
    history.push(`/book/question/${book_id}`)
    handleClickOutsideChapterList()
  };

  const handleScroll = (e) => {
    var progress_line = document.getElementById('chapter-list-progress-line');
    var scroll_position = document.getElementById('chapter-list-container').scrollTop
    if (scroll_position >= 65) {
      progress_line.style.top = '0px';
    } else {
      progress_line.style.top = '65px';
    }
  };
  
  return (
    <div id="book-zoom">
      {isLoading
      ? <Loading /> 
      :<div>
        <div id="chapter-list-show" className="show-none">
        <div id="chapter-list-container" className="show-flex" onScroll={handleScroll}>
            <ChapterBar book={book} chapters={chapterData} handleGetChapter={handleGetChapter} handleGetQuiz={handleGetQuiz} />
            <div className="chapter-icon" onClick={handleClickChapter}></div>
          </div>
        </div>

        <div id="filter" className="show-none" onClick={handleClickOutsideChapterList}></div>
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
              ? <QuizContent quiz={quiz} /> 
              : chapterData.chapter.text.map((paragraph) => {
                return <div className="book-chapter-text-paragraph">{paragraph}</div>
              })
              }
            </div>

            <ControlButtonBar book={book} chapterData={chapterData} chapter_id={chapter_id} handleGetQuiz={handleGetQuiz}/>
            
          </div>
        </div>

        <BottomBar book={book} chapterData={chapterData} />
      </div>
    }
  </div>
    
  )
}


export default withRouter(BookZoom);