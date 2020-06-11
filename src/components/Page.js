import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Common/Header';
import ComponentsHeader from './Common/ComponentsHeader';
import Headline from './Categories/Headline';
import ListCategories from './Categories/ListCategories';
import MarketingSales from './Library/MarketingSales';
import Account from './User/Account';
import Payment from './User/Payment';
import { fetchGetUserDetail } from 'api/Action/User/UserDetailAction';
import { useDispatch } from 'react-redux';

var category = [{'icon':'img/sales.svg', 'name':'Marketing & Sales'}] 

const Page = (props) => {
  const [ name, setName ] = useState('')

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getName = async() => { 
      const user = await dispatch(fetchGetUserDetail(props.token))
      console.log(user)
      setName(user.data.email.split('@')[0])
    }

    getName()
  }, [])

  const handleClickOutsideSearch = () => {
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

  return (
    <div>
      <div className="show-flex">
        <div className="header-container">
          <Header />
        </div>
        <ComponentsHeader token={props.token}/>
      </div>
      {location.pathname === '/' 
      ? <div onClick={handleClickOutsideSearch}>
        <Headline title="Xin chào, " name={name} />
        <ListCategories categories={category}/></div>
      : [
      <div id="discovery-dropdown-content" className={location.pathname === '/' ? '' : 'show-none'}>
        <Headline title="Khám phá các chủ đề"/>
        <ListCategories categories={category}/>
      </div>,
      <div className="body-container" onClick={handleClickOutsideSearch}>
        {location.pathname === '/components' 
          ? <MarketingSales token={props.token}/> 
          : location.pathname === '/account' 
          ? <Account token={props.token}/> 
          : <Payment />}
      </div>
      ]}
    </div>
  )
}

export default Page;

