import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import ListBook from './ListBook';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetLibrary } from 'api/Action/Categories/LibraryAction';


const MarketingSales = (props) => {
  const [ library, setLibrary ] = useState({});
  const [ libraryProgress, setLibraryProgress ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isFinishedList, setIsFinishedList ] = useState(false);

  const dispatch = useDispatch()
  const token = useSelector(state => state.access_token)

  useEffect(() => {
    const getLibrary = async() => {
      setIsLoading(true);
      const library = await dispatch(fetchGetLibrary(token));
      if (!!library) {
        setLibrary(library.data.bookself.reading);
        setLibraryProgress(library.data.library_progress);
        if (library.length < 3) {
          var list_book = document.getElementsByClassName('list-book').item(0);
          list_book.style.justifyContent = 'left';
        }
      setIsLoading(false);
      }
    }

    getLibrary()
    }, [dispatch, token]
  )

  useEffect(() => {
    const fetchLibraries = async () => {
      setIsLoading(true);
      var library = await dispatch(fetchGetLibrary(token));
      if (!!library) {
        if (isFinishedList) {
          setLibrary(library.data.bookself.finished);
          setLibraryProgress(library.data.library_progress);
        } else {
          setLibrary(library.data.bookself.reading);
          setLibraryProgress(library.data.library_progress);
        }
        setIsLoading(false);
        var listBook = document.getElementsByClassName('list-book').item(0);
        if (library.length < 3) {
          listBook.style.justifyContent = 'left';
        }
        else {
          listBook.style.justifyContent = '';
        }
      }
    }
    fetchLibraries();
    
  }, [isFinishedList, token, dispatch])
  

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('in-progress')) {
      setIsFinishedList(false);
    }
    else {
      setIsFinishedList(true);
    }
  };

  return (
      <div>     
        <div >
          <div id="category-banner" className="show-flex no-blackout">
            <div id="category-name" className="black-big-text">Marketing & Sales</div>
            <div id="progress-bar">
              <ProgressBar progress={libraryProgress} token={token} isLoading={isLoading}/>
            </div>
          </div>
          <div className="grey-18-normal-text show-flex no-blackout">
            <div className="banner">
              <div className={isFinishedList ? "in-progress" : "in-progress orange-text"} onClick={handleClick}>Đang đọc</div>
              <div className={isFinishedList ? "in-progress line-below-banner" : "in-progress line-below-banner orange-text"}
                    onClick={handleClick}></div>
            </div>
            <div className="banner">
              <div className={isFinishedList ? "finished orange-text" : "finished"} onClick={handleClick}>Đã hoàn thành</div>
              <div className={isFinishedList ? "finished line-below-banner orange-text" : "finished line-below-banner"} 
                    onClick={handleClick}></div>
            </div>
          </div>
          <ListBook isLoading={isLoading} library={library}/>
        </div>
      </div>
  ) 
}

export default MarketingSales;
