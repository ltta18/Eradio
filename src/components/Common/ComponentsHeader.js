import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogOut } from '../../api/Action/User/AuthAction';
import { fetchSearch } from '../../api/Action/Categories/SearchAction';
import history from '../../history';
import { fetchBook } from 'api/Action/Book/BookDirectoryAction';
import { selectAccessToken } from 'api/Reducer/AuthReducer';

const ComponentsHeader = (props) => {
  const [search_result, set_search_result] = useState(undefined);

  const dispatch = useDispatch();
  const location = useLocation();
  // const token = useSelector(selectAccessToken)
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDk1NzUxMjYsImlhdCI6MTYwNDM4NzUyMSwic3ViIjoyfQ.OOg3c0H-XDQQ7F3lQ9r6HFkB-P2UrrvG20W41EMzdZU'

  const handleSearchClick = () => {
    var search = document.getElementById('search');
    var dropdown_icon = document.getElementsByClassName('dropdown-icon');
    var class_add_to_search;
    var class_rem_from_search;
    var search_add;
    if (search.classList.contains('search-hide')) {
      class_add_to_search = 'show-flex';
      class_rem_from_search = 'show-none';
      search_add = '';
    }
    else {
      class_add_to_search = 'show-none';
      class_rem_from_search = 'show-flex';
      search_add = 'search-hide'
    }
    search.setAttribute('class', search_add)
    for (var i=0; i<dropdown_icon.length; i++) {
      if (!dropdown_icon.item(i).classList.contains('hidden')) {
        dropdown_icon.item(i).classList.add(class_rem_from_search);
        dropdown_icon.item(i).classList.remove(class_add_to_search);
      }
      
    }
  }

  const handleSearch = async(e) => {
    const search_result = await dispatch(fetchSearch(token, e.target.value));
    if (!!search_result) {
      set_search_result(search_result.data.result)
    }
  }

  const handleClickBookSearch = async(e) => {
    var book_id = e.target.classList[1].split('-')[1] 
    const book = await dispatch(fetchBook(book_id, token))
    var progress = book.data.book_progress-1
    if (progress < 0) {
      progress = 0
    }
    history.push(`./book/${book_id}/chapter/${progress}`)
  }

  const handleClickDiscoveryDropdown = () => {
    var discovery_dropdown_content = document.getElementById('discovery-dropdown-content');
    if (discovery_dropdown_content.classList.contains("discovery-dropdown-content-show")) {
      discovery_dropdown_content.setAttribute('class', 'discovery-dropdown-content-hide');
    }
    else {
      discovery_dropdown_content.setAttribute('class', 'discovery-dropdown-content-show');
      discovery_dropdown_content.scrollIntoView();
    }

    // close friend dropdown
    var friend_dropdown_content = document.getElementsByClassName('friend-dropdown-content-container');
    for (var i=0; i<friend_dropdown_content.length; i++) {
      friend_dropdown_content.item(i).style.display = 'none';
    }
  }

  const handleClickFriendDropdown = () => {
    var friend_dropdown_content = document.getElementsByClassName('friend-dropdown-content-container');
    var display_style;
    if (friend_dropdown_content.item(0).style.display === 'block') display_style = 'none';
    else display_style = 'block';
    for (var i=0; i<friend_dropdown_content.length; i++) {
      friend_dropdown_content.item(i).style.display = display_style;
    }

    // close discovery dropdown
    var discovery_dropdown_content = document.getElementById('discovery-dropdown-content');
    if (discovery_dropdown_content) {
      if (discovery_dropdown_content.classList.contains("discovery-dropdown-content-show")) {
        discovery_dropdown_content.setAttribute('class', 'discovery-dropdown-content-hide')
      }
    }
  }

  // const handleToAdmin = () => {
  //   history.push('/admin')
  // }

  const handleToAccount = () => {
    history.push('/account')
  }

  const handleToPayment = () => {
    history.push('/payment')
  }
    
  return (
      <div id="component-header" className="show-flex component-header no-blackout">
        <div className="search-button" onClick={handleSearchClick}></div>
        <div className="search-hide " id="search">
          <input placeholder="Tìm kiếm sách hoặc tên tác giả" type="text" name="search-bar" id="search-bar" className="grey-18-normal-text" onChange={handleSearch}></input>
          
            {search_result ? 
            <div className="search-dropdown-content-container">
            <div className="search-dropdown-content-hidescroll">
              {search_result.map((book,i) => {return (
                <div onClick={handleClickBookSearch} className={`remove-underline booksearch-${book.id}`}>
                <div className={`search-dropdown-content booksearch-${book.id}`} style={i === search_result.length-1 ? {borderBottom: 'none !important'} : {}}>
                  <img className={`search-dropdown-img booksearch-${book.id}`} src={book.image} alt="book-cover" width="50px" height="50px"></img>
                  <div className={`search-dropdown-info booksearch-${book.id}`} style={{display: 'block'}}>
                    <div className={`search-dropdown-info-name booksearch-${book.id}`}>{book.name}</div>
                    <div className={`search-dropdown-info-author booksearch-${book.id}`}>{book.author}</div>
                  </div>
                </div>
                </div>)})}
            </div>
            </div>
            : ''}
          
        </div>
        {location.pathname === '/'
        ? <div id="discovery-dropdown-icon" className="dropdown-icon hidden" onClick={handleClickDiscoveryDropdown}></div>
        : <div id="discovery-dropdown-icon" className="dropdown-icon" onClick={handleClickDiscoveryDropdown}></div>
        }
        <div style={{'margin': 'auto 0'}}>
          <div id="friend-dropdown-icon" className="dropdown-icon" onClick={handleClickFriendDropdown}>
            <div className="friend-dropdown-content-container">
              {/* <div className="small-text friend-dropdown-content" onClick={handleToAdmin}>Admin</div> */}
              <div className="small-text friend-dropdown-content" onClick={handleToAccount}>Thông tin tài khoản</div>
              <div className="small-text friend-dropdown-content" onClick={handleToPayment}>Thanh toán</div>
              {/* <div className="small-text friend-dropdown-content" style={{'border':'none'}} onClick={() => dispatch(fetchLogOut(token))}>Đăng xuất</div> */}
            </div>
          </div>
        </div>
        <div  onClick={handleClickFriendDropdown}></div>
      </div>
    )
}


export default ComponentsHeader;
