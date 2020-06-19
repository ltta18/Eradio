import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Common/Header';
import ComponentsHeader from './Common/ComponentsHeader';
import Headline from './Categories/Headline';
import ListCategories from './Categories/ListCategories';
import MarketingSales from './Library/MarketingSales';
import Account from './User/Account';
import Payment from './User/Payment';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccessToken } from 'api/Reducer/AuthReducer';
import { fetchUserDetail } from 'api/Action/User/UserDetailAction';
import { selectUserDetail } from 'api/Reducer/UserReducer';

var category = [{'icon':'img/sales.svg', 'name':'Marketing & Sales'}] 

const Page = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const token = useSelector(selectAccessToken)
  const user = useSelector(selectUserDetail)
  const [ name, setName ] = useState('')
  
  useEffect(() => {
    setName(user.data.email.split('@')[0])
  }, [user])

  useEffect(() => {
      dispatch(fetchUserDetail(token))
  }, [dispatch, token])

  const handleClickOutsideSearch = () => {
    var search = document.getElementById('search');
    var friend_dropdown = document.getElementsByClassName('friend-dropdown-content-container');
    var dropdown = document.getElementsByClassName('dropdown');
    var dropdown_icon = document.getElementsByClassName('dropdown-icon');
    var category_dropdown = document.getElementById('discovery-dropdown-content')
    search.classList.remove('show-flex');
    search.classList.add('show-none');
    friend_dropdown.item(0).style.display = 'none';
    for (var i=0; i<dropdown.length; i++) {
      dropdown.item(i).classList.add('show-flex');
      dropdown.item(i).classList.remove('show-none');
      dropdown_icon.item(i).classList.add('show-flex');
      dropdown_icon.item(i).classList.remove('show-none');
      category_dropdown.classList.remove('show')
    }
  }

  const isHomePage = () => {
    if (location.pathname === '/') {
      return (
        <div onClick={handleClickOutsideSearch}>
          <Headline title="Xin chào, " name={name}/>
          <ListCategories categories={category}/>
        </div>
      )
    } 
    else {
      return (
        <div>
          <div id="discovery-dropdown-content" className={location.pathname === '/' ? '' : 'show-none'}>
            <Headline title="Khám phá các chủ đề"/>
            <ListCategories categories={category}/>
          </div>
          <div className="body-container" onClick={handleClickOutsideSearch}>
            {location.pathname === '/components' 
              ? <MarketingSales/> 
              : location.pathname === '/account' 
              ? <Account/> 
              : <Payment />}
        </div>
      </div>
      )
    }
  }

  return (
    <div>
      <div className="show-flex">
        <div className="header-container">
          <Header />
        </div>
        <ComponentsHeader/>
      </div>
      {isHomePage()}
    </div>
  )
}

export default Page;

