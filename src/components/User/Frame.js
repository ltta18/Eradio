import React, { useState } from 'react';
import Header from '../Common/Header';
import { useDispatch } from 'react-redux';
import { fetchSignIn } from '../../api/Action/User/AuthAction';
import { fetchSignUp } from '../../api/Action/User/SignupAction';
import { validateInput } from '../../utils/input';
import { useLocation } from 'react-router-dom';

const Frame = (props) => {
  const [email, setEmail] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const dispatch = useDispatch();

  const isValid = () => {
    const { new_errors, isValid } = validateInput({email, retypePassword, password, isLoading, errors});
    if (!isValid) {
      setErrors({ new_errors })
    }
    return isValid;
  }

  const handleChange = (e) => {
    if (e.target.id === 'retype-password') setRetypePassword(e.target.value);
    else if (e.target.id === 'email') setEmail(e.target.value);
    else if (e.target.id === 'password') setPassword(e.target.value);
    var e_change = document.getElementById(e.target.id+'-container');
    e_change.style.borderColor = 'rgba(0, 0, 0, 0.1)';
  }

  const handleClick = () => {
    var button = document.getElementById('remember');
    if (button.checked === false) {
      button.checked = 'checked';
      if (props.checkbox_message !== "Nhớ tài khoản của tôi") setIsLoading(false);
    }
    else {
      button.checked = '';
      if (props.checkbox_message !== "Nhớ tài khoản của tôi") setIsLoading(true);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    var valid = isValid();
    var checkbox = document.getElementsByClassName('signin-signup-frame-new-checkbox').item(0);
    var button = document.getElementById('remember');

    if (errors.email) {
      var email_container = document.getElementById('email-container');
      email_container.style.borderColor = '#cc0000';
    }

    if (errors.password) {
      var password_container = document.getElementById('password-container');
      password_container.style.borderColor = '#cc0000';
    }

    // if sign up
    if (props.checkbox_message !== "Nhớ tài khoản của tôi") {
      if (errors.retype_password) {
        var retype_password = document.getElementById('retype-password-container');
        retype_password.style.borderColor = '#cc0000';
      }
      if (button.checked === false) {
        checkbox.style.borderColor = '#cc0000';
      }
    }

    if (valid) {
      setErrors({});
      setIsLoading(true);
      if (location.pathname === '/signin') {
        await dispatch(fetchSignIn(email, password));
      }
      else await dispatch(fetchSignUp(email, password));
      setIsLoading(false);
    }
  }
    // if isVerify, want to show message and hide all input bars
    const verify_message_show = location.pathname === "/verify"?"show-flex":"show-none";
    const verify_hide_inputs = location.pathname === "/verify"?" show-none":"";
    const signup_margin_reduced = location.pathname === '/signup'?"margin-reduced ":"";

    return (
      <div className="signin-signup-container">
        <div className="signin-signup-frame-container">
          <div className="signin-signup-frame-header">
            <Header />
          </div>

          <div className={"signin-signup-frame " + signup_margin_reduced}>
            <div id="verify-message" className={"black-big-text " + verify_message_show}>
              Cảm ơn bạn đã đăng ký!
            </div>
            <div id="error" className="show-none">*** Email/ Mật khẩu không hợp lệ</div>
            <form onSubmit={handleSubmit}>
              <div id="email-container" className={"signin-signup-frame-account " + verify_hide_inputs}>
                <input className="signin-signup-frame-account-input remove-underline" placeholder="Email" 
                      type="text" name="email" id="email" onChange={handleChange}>
                </input>
              </div>
              <div id="password-container" className={"signin-signup-frame-account " + verify_hide_inputs}>
                <input className="signin-signup-frame-account-input remove-underline" placeholder="Mật khẩu" 
                      type="password" name="password" id="password" onChange={handleChange}>
                </input>
              </div>
              <div id="retype-password-container" className={"signin-signup-frame-account " + props.pass_retype + verify_hide_inputs}>
                <input className="signin-signup-frame-account-input remove-underline" placeholder="Nhập lại mật khẩu" 
                       type="password" name="retype_password" id="retype-password" onChange={handleChange}>
                </input>
              </div>
              
              <div className={"signin-signup-frame-checkbox " + verify_hide_inputs}>
                <input type="checkbox" id="remember" name="remember" className="checkbox"></input><span className="signin-signup-frame-new-checkbox" onClick={handleClick}></span>
                <label htmlFor="remember" className="checkbox-text">{props.checkbox_message}</label>            
              </div>
              <button className={"signin-signup-frame-button "+ signup_margin_reduced + verify_hide_inputs} disabled={isLoading}><span className="signin-signup-button">{props.submit_message}</span></button>
            </form>

            <a className={"signin-signup-frame-button remove-underline " + verify_message_show} href="/signin"><span className="signin-signup-button" >Quay lại trang Đăng nhập</span></a>
            <div className={"signin-signup-ask "+ signup_margin_reduced}>
              <div className="account-ask">
                {props.account_ask}
              </div>
              <a href={props.href} className="todo-ask remove-underline" >
                {props.todo_ask}
              </a>
            </div>
            
          </div>
        </div>
      </div>
    )
}

export default Frame;