import React from 'react';
import history from '../history';
import Header from './Common/Header';
import ComponentsHeader from './Common/ComponentsHeader';
import Headline from './HomePage/Categories/Headline';
import ListCategories from './HomePage/Categories/ListCategories';
import MarketingSales from './HomePage/Components/MarketingSales';
import Account from './Me/Account';
import Payment from './Me/Payment';

var category = [{'icon':'img/sales.svg', 'name':'Marketing & Sales'}] 

class Page extends React.Component {
  handleClickOutsideSearch = () => {
    var search = document.getElementById('search');
    var friend_dropdown = document.getElementsByClassName('friend-dropdown-content-container');
    var dropdown = document.getElementsByClassName('dropdown');
    var dropdown_icon = document.getElementsByClassName('dropdown-icon');
    search.classList.remove('show-flex');
    search.classList.add('show-none');
    friend_dropdown.item(0).style.display = 'none';
    for (var i=0; i<dropdown.length; i++) {
      dropdown.item(i).classList.add('show-flex');
      dropdown.item(i).classList.remove('show-none');
      dropdown_icon.item(i).classList.add('show-flex');
      dropdown_icon.item(i).classList.remove('show-none');
    }
  }

  render() {
    return (
      <div>
        <div className="show-flex">
          <div className="header-container">
            <Header />
          </div>
          <ComponentsHeader token={this.props.token}/>
        </div>
        {history.location.pathname === '/' 
        ? <div onClick={this.handleClickOutsideSearch}>
          <Headline title="Xin chào, " name='Linh' />
          <ListCategories categories={category}/></div>
        : [
        <div id="discovery-dropdown-content" className={history.location.pathname === '/' ? '' : 'show-none'}>
          <Headline title="Khám phá các chủ đề"/>
          <ListCategories categories={category}/>
        </div>,
        <div className="body-container" onClick={this.handleClickOutsideSearch}>
          {history.location.pathname === '/components' 
            ? <MarketingSales token={this.props.token}/> 
            : history.location.pathname === '/account' 
            ? <Account token={this.props.token}/> 
            : <Payment />}
        </div>
        ]}
      </div>
    )
  }
}

export default Page;

