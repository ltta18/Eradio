import React from 'react';
import Frame from './Frame';

const SignIn = () => {
  return (
    <Frame checkbox_message="Nhớ tài khoản của tôi" account_ask="Bạn chưa có tài khoản?" 
            todo_ask="Tạo tài khoản mới" submit_message="Đăng nhập" href="/signup"
            pass_retype="show-none " fetch='fetchSignIn'/>
  )
}


export default SignIn;