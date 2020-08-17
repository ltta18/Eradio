import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccessToken } from 'api/Reducer/AuthReducer';
import { fetchUserDetail } from 'api/Action/User/UserDetailAction';

import Header from './Common/Header';
import ComponentsHeader from './Common/ComponentsHeader';
import Headline from './Categories/Headline';
import ListCategories from './Categories/ListCategories';
import MarketingSales from './Library/MarketingSales';
import Account from './User/Account';
import Payment from './User/Payment';
import Admin from './Admin/Admin';

var category = [{'icon':'img/sales.svg', 'name':'Marketing & Sales'}] 

const Page = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const token = useSelector(selectAccessToken)
  const [ name, setName ] = useState('')
  
  // useEffect(() => {
  //   const getUserDetail = async() => {
  //     const user = await dispatch(fetchUserDetail(token))
  //     if (user) {
  //       setName(user.data.email.split('@')[0])
  //     }
  //   }
  //   getUserDetail()
  // }, [dispatch, token])

  const handleClickOutsideSearch = () => {
    var search = document.getElementById('search');
    var friend_dropdown = document.getElementsByClassName('friend-dropdown-content-container');
    var dropdown_icon = document.getElementsByClassName('dropdown-icon');
    var category_dropdown = document.getElementById('discovery-dropdown-content')
    search.classList.remove('show-flex');
    search.classList.add('show-none');
    friend_dropdown.item(0).style.display = 'none';
    if (location.pathname === '/') {
      dropdown_icon.item(1).classList.add('show-flex')
      dropdown_icon.item(1).classList.remove('show-none')
    }
    else {
      for (var i=0; i<dropdown_icon.length; i++) {
        dropdown_icon.item(i).classList.add('show-flex')
        dropdown_icon.item(i).classList.remove('show-none')
        category_dropdown.classList.remove('show')
      }
    }
  }

  const getBodyContent = () => {
    if (location.pathname === '/components') {
      return <MarketingSales /> 
    }
    else if (location.pathname === '/account') {
      return <Account /> 
    }
    else if (location.pathname === '/admin') {
      return <Admin />
    }
    else if (location.pathname === '/payment') {
      return <Payment />
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
        <div id="body" style={{height: 'calc(100% - 80px)'}}>
          <div id="discovery-dropdown-content" className={location.pathname === '/' ? '' : 'show-none'}>
            <Headline title="Khám phá các chủ đề"/>
            <ListCategories categories={category}/>
          </div>
          <div className="body-container" onClick={handleClickOutsideSearch}>
            {getBodyContent()}
        </div>
      </div>
      )
    }
  }

  return (
    <div style={{height: '100vh'}}>
      <div id="header" className="show-flex">
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

