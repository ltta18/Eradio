import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetail } from 'api/Action/User/UserDetailAction';
import Loading from 'components/Common/Loading';
import { selectAccessToken } from 'api/Reducer/AuthReducer';

const Account = () => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ detail, setDetail ] = useState({email: '', type_account: '', registered_on: '', exp: ''})
  const dispatch = useDispatch();
  // const token = useSelector(selectAccessToken)
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDQwNTUwMzYsImlhdCI6MTYwNDA1MTQzMSwic3ViIjoyfQ.oFs49DjykyDmIjvsKAYpxPW9GxxfbnWPcn7CGTepS2Y'

  useEffect (() => {
    const getUserDetail = async() => {
      setIsLoading(true)
      const user_detail = await dispatch(fetchUserDetail(token));
      if (user_detail) {
        setDetail(user_detail.data);
       }
       setIsLoading(false);
    }
    getUserDetail()
  }, [dispatch, token])

    return (
      <div id="account">
        { isLoading ? <Loading /> :
        [
        <div className="me-header">Tài khoản</div>,
        <div className="account-section">
          <div className="account-section-header">Thông tin tài khoản</div>
          <div className="account-section-info">Email: {detail.email}</div>
        </div>,
        <div className="account-section">
          <div className="account-section-header">Loại tài khoản</div>
          <div className="account-section-info">{detail.type_account}</div>
        </div>,
        <div className="account-section">
          <div className="account-section-header">Thời gian tạo tài khoản</div>
          <div className="account-section-info">{detail.registered_on}</div>
        </div>,
        <div className="account-section">
          <div className="account-section-header">Thời hạn sử dụng</div>
          <div className="account-section-info">{detail.exp}</div>
        </div>
        ]
        }
      </div>
    )
}

export default Account;
