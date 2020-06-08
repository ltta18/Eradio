import React from 'react';
import { connect } from 'react-redux';
import { fetchLogOut } from '../../api/Action/User/AuthAction';
import { fetchSearch } from '../../api/Action/Categories/SearchAction';
import history from '../../history';
import { useLocation } from 'react-router-dom';

class ComponentsHeader extends React.Component {
  state = {
    search_result: undefined,
    location: '',
  }

  handleSearchClick = () => {
    var search = document.getElementById('search');
    // var dropdown = document.getElementsByClassName('dropdown');
    var dropdown_icon = document.getElementsByClassName('dropdown-icon');
    var class_add_to_search;
    var class_rem_from_search;
    if (search.classList.contains('show-none')) {
      class_add_to_search = 'show-flex';
      class_rem_from_search = 'show-none';
    }
    else {
      class_add_to_search = 'show-none';
      class_rem_from_search = 'show-flex';
    }
    search.classList.remove(class_rem_from_search);
    search.classList.add(class_add_to_search);
    for (var i=0; i<dropdown_icon.length; i++) {
      if (!dropdown_icon.item(i).classList.contains('hidden')) {
        dropdown_icon.item(i).classList.add(class_rem_from_search);
        dropdown_icon.item(i).classList.remove(class_add_to_search);
      }
      
    }
  }

  handleSearch = async(e) => {
    const search_result = await this.props.fetchSearch(this.props.token, e.target.value);
    if (!!search_result) {
      this.setState({search_result: search_result.data.result})
    }
    console.log(search_result);
  }

  handleClickDiscoveryDropdown = () => {
    var discovery_dropdown_content = document.getElementById('discovery-dropdown-content');
    if (discovery_dropdown_content.classList.contains("show")) discovery_dropdown_content.classList.remove("show");
    else discovery_dropdown_content.classList.add("show");
    var friend_dropdown_content = document.getElementsByClassName('friend-dropdown-content-container');
    for (var i=0; i<friend_dropdown_content.length; i++) {
      friend_dropdown_content.item(i).style.display = 'none';
    }
  }

  handleClickFriendDropdown = () => {
    var friend_dropdown_content = document.getElementsByClassName('friend-dropdown-content-container');
    var display_style;
    if (friend_dropdown_content.item(0).style.display === 'block') display_style = 'none';
    else display_style = 'block';
    for (var i=0; i<friend_dropdown_content.length; i++) {
      friend_dropdown_content.item(i).style.display = display_style;
    }
  }

  handleToAccount = () => {
    history.push('/account')
  }

  handleToPayment = () => {
    history.push('/payment')
  }

  render() {
    const search_result = this.state.search_result;
    
    return (
        <div id="component-header" className="show-flex component-header no-blackout">
          <div className="search-button" onClick={this.handleSearchClick}></div>
          <div className="show-none " id="search">
            <input placeholder="Tìm kiếm sách hoặc tên tác giả" type="text" name="search-bar" id="search-bar" className="grey-18-normal-text" onChange={this.handleSearch}></input>
            
              {search_result ? 
              <div className="search-dropdown-content-container">
              <div className="search-dropdown-content-hidescroll">
                {search_result.map((book,i) => {return (
                  <a href={`./book/${book.id}/chapter/0`} className="remove-underline">
                  <div className="search-dropdown-content" style={i === search_result.length-1 ? {'border-bottom': 'none !important'} : {}}>
                    <img className="search-dropdown-img" src={book.image} alt="book-cover" width="50px" height="50px"></img>
                    <div className="search-dropdown-info" style={{display: 'block'}}>
                      <div className="search-dropdown-info-name">{book.name}</div>
                      <div className="search-dropdown-info-author">{book.author}</div>
                    </div>
                  </div>
                  </a>)})}
              </div>
              </div>
              : ''}
            
          </div>
          {/* {console.log(getLocation())} */}
          {history.location.pathname === '/components'
          ? 
            <div id="discovery-dropdown-icon" className="dropdown-icon" onClick={this.handleClickDiscoveryDropdown}></div>
          : <div id="discovery-dropdown-icon" className="dropdown-icon hidden" onClick={this.handleClickDiscoveryDropdown}></div>
          }
          <div style={{'margin': 'auto 0'}}>
            <div id="friend-dropdown-icon" className="dropdown-icon" onClick={this.handleClickFriendDropdown}>
              <div className="friend-dropdown-content-container">
                <div className="friend-dropdown-content" onClick={this.handleToAccount}>Thông tin tài khoản</div>
                <div className="friend-dropdown-content" onClick={this.handleToPayment}>Thanh toán</div>
                <div className="friend-dropdown-content" style={{'border':'none'}} onClick={() => this.props.fetchLogOut(this.props.token)}>Đăng xuất</div>
              </div>
            </div>
          </div>
          <div  onClick={this.handleClickFriendDropdown}></div>
        </div>
    )
  }
}


export default connect(null, { fetchLogOut, fetchSearch })(ComponentsHeader);