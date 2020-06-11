import React from 'react';
import Frame from './Frame';

var checkbox_message = ['Tôi đồng ý với', <a href="/signin" class="todo-ask remove-underline"> Các điều khoản dịch vụ</a>]

class SignUp extends React.Component {
  render() {
    return (
      <Frame checkbox_message={checkbox_message} account_ask="Bạn đã có tài khoản?" 
             todo_ask="Đăng nhập" submit_message="Tạo tài khoản" href="/signin" fetch='fetchSignUp'/>
    )
  }
}


export default SignUp;