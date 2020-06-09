import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import GreenAudioPlayer from 'green-audio-player';
import { fetchGetChapter } from '../../api/Action/Book/ChapterAction'
import { fetchGetBook } from '../../api/Action/Book/BookDirectoryAction'
import history from '../../history';
import Loading from '../Common/Loading';

const default_state = {
  book: {
    directory: [],
  },
  chapter: {
   chapter: {
     text: [],
   }
  },
  is_loading: false,
};


class BookZoom extends React.Component {
  state = default_state;

  componentDidMount = async () => {
    const book_id = this.props.match.params.book_id;
    const chapter_id = this.props.match.params.chapter_id;
    this.setState({is_loading: true})
    const book = await this.props.fetchGetBook(book_id, this.props.token);
    const chapter = await this.props.fetchGetChapter(book_id, chapter_id, this.props.token);
    if (!!book || !!chapter) {
      this.setState({
        book: book.data,
        chapter: chapter.data,
        is_loading: false,
      })

      var chapter_progress = document.getElementById('chapter-progress-finished');
      chapter_progress.style.width = String((parseInt(book.data.book_progress)+1)/(book.data.directory.length)*100)+'%';
      
    }
  }

  componentDidUpdate = () => {
    GreenAudioPlayer.init(
      {
        selector: '.audio-bar',
      }
    )
  }

  handleClickOutsideVolume = () => {
    var volume_button = document.getElementsByClassName('volume__button').item(0);
    var volume_controls = document.getElementsByClassName('volume__controls').item(0);
    volume_button.classList.remove('open');
    volume_button.setAttribute('aria-label','Open Volume Controls');
    volume_controls.classList.add('hidden')
  }

  handleClickChapter = () => {
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
      this.handleClickOutsideChapterList();
    }
  }

  handleClickOutsideChapterList = () => {
    var chapter_list = document.getElementById('chapter-list-show');
    var filter = document.getElementById('filter');
    var outside_chapter_list = document.getElementById('book-zoom-body');
    chapter_list.style.position = '';
    chapter_list.classList.add('show-none');
    filter.classList.add('show-none');
    filter.style.position = '';
    outside_chapter_list.classList.remove('book-zoom-body-left-open');
  }

  handleGetChapter = async(e) => {
    const target_id = e.target.id.substring(4,5)
    history.push(`./${target_id}`)
    window.location.reload()
  }

  handleBackButton = async() => {
    const { chapter: chapterData } = this.state;
    var previous_chapter_num = String(parseInt(chapterData.chapter.id)-1);
    history.push(`./${previous_chapter_num}`)
    window.location.reload()
  }

  handleNextButton = async() => {
    const { chapter: chapterData } = this.state;
    var next_chapter_num = String(parseInt(chapterData.chapter.id)+1);
    history.push(`./${next_chapter_num}`)
    window.location.reload()
  }

  handleScroll = (e) => {
    var progress_line = document.getElementById('chapter-list-progress-line');
    var scroll_position = document.getElementById('chapter-list-container').scrollTop
    if (scroll_position >= 65) {
      progress_line.style.top = '0px';
    } else {
      progress_line.style.top = '65px';
    }
  };
  
  

  render() {
    const { book, chapter: chapterData } = this.state;
    return (
      <div id="book-zoom">
        {this.state.is_loading === true 
        ? <Loading /> 
        :<div>
          <div id="chapter-list-show" className="show-none">
          <div id="chapter-list-container" className="show-flex" onScroll={this.handleScroll}>
            <div id="chapter-list">
                
                {book.directory.map((chapter) => {
                  return (
                    <div>
                      <div id={'book'+chapter.id} className="chapter show-flex" onClick={this.handleGetChapter}>
                        <div id={'book'+chapter.id} className={String(chapter.id) === chapterData.chapter.id
                                                  ? "chapter-status-button current-read-button"
                                                  : chapter.id > book.book_progress
                                                  ? "chapter-status-button not-yet-read-button"
                                                  : "chapter-status-button completed-read-button"}>            
                        </div>
                        <div id={'book'+chapter.id} className="chapter-header">
                          {chapter.name}
                        </div>
                      </div>
                      <div id={'book'+chapter.id} className="padding-progress-line"></div>
                    </div>
                  )})}
                <div id="chapter-list-progress-line"></div>
              </div>

              <div className="chapter-icon" onClick={this.handleClickChapter}></div>
            </div>
          </div>

          <div id="filter" className="show-none" onClick={this.handleClickOutsideChapterList}></div>
          <div id="book-zoom-body" className="show-flex" onClick={this.handleClickOutsideVolume}>
            <div id="book-zoom-menu-bar">
              <div className="chapter-icon" onClick={this.handleClickChapter}></div>
              <a id="house-icon-container" href="/components"><div id="house-icon"></div></a>
            </div>
            <div id="book-content">
              <div id="book-chapter-heading">
                {chapterData.chapter.name}
                </div>
              <div className="book-chapter-text">
                {chapterData.chapter.text.map((paragraph) => {
                  return <div className="book-chapter-text-paragraph">{paragraph}</div>
                })}
              </div>
              <div id="chapter-control-button" className="show-flex">
                {chapterData.chapter.id !== String(0)
                ? <div id="back-button" className="show-flex" onClick={this.handleBackButton}>
                    <div id="back-button-icon"></div>Chương trước
                  </div>
                : ''}

                {chapterData.chapter.id !== String(parseInt(book.directory.length)-1)
                ? <div id="next-button" className="show-flex" onClick={this.handleNextButton}>
                    Chương sau<div id="next-button-icon"></div>
                  </div> 
                : ''} 
              </div>
            </div>
          </div>

          <div id="chapter-progress-bar">
            <div id="chapter-progress-finished"></div>
          </div>
          <div id="bottom-bar" className="show-flex">
            <div id="chapter-progress-text">
              {'Chương '+ String(parseInt(chapterData.chapter.id)+1) + '/' + book.directory.length}
            </div>
            <div className="audio-bar">
              <audio crossorigin>
                <source src={chapterData.chapter.audio} type="audio/mpeg" autoPlay></source>
              </audio>
            </div>
          </div>
        </div>
      }
    </div>
      
    )
  }
}


export default withRouter(connect(null, { fetchGetChapter, fetchGetBook })(BookZoom));