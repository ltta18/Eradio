import React, { useState } from 'react';
import Header from '../Common/Header';
import history from '../../history';
import { useDispatch } from 'react-redux';
import { fetchSignIn } from '../../api/Action/User/AuthAction';
import { fetchSignUp } from '../../api/Action/User/SignupAction';
import { validateInput } from '../../utils/input';
import { useLocation } from 'react-router-dom';

const Frame = (props) => {
  const [email, setEmail] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isCheckedBox, setIsCheckedBox] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  const isValid = () => {
    const pathname = location.pathname
    const { errors: newErrors, isValid } = validateInput({email, retypePassword, password}, pathname);
    setErrors({...newErrors, isFalse: false});
    return { errors, isValid };
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
      if (props.checkbox_message !== "Nhớ tài khoản của tôi") setIsCheckedBox(false);
    }
    else {
      button.checked = '';
      if (props.checkbox_message !== "Nhớ tài khoản của tôi") setIsCheckedBox(true);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    var { isValid: valid } = isValid();

    if (valid) {
      if (location.pathname === '/signin') {
        await dispatch(fetchSignIn(email, password));
      }
      else {
        let message = await dispatch(fetchSignUp(email, password));
        setErrors({...errors, email: message, isFalse: message ? true : false})
      }
    }
  }
    // if isVerify, want to show message and hide all input bars
    const verify_message_show = location.pathname === "/verify"?"show-flex":"show-none";
    const verify_hide_inputs = location.pathname === "/verify"?" show-none":"";
    const signup_margin_reduced = location.pathname === '/signup'?"margin-reduced ":"";

    const handleGoSignIn = () => {
      history.push('/signin')
    }

    const handleGoToDo = () => {
      history.push(`${props.href}`);
    }

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
            
            <form onSubmit={handleSubmit}>
            <div className={errors.isFalse && location.pathname === '/signin' ? "show-flex" : "show-none"} style={{position: 'absolute', top: '80px'}}><div className="error-icon"></div><span>Tài khoản/ Mật khẩu sai</span></div>
              <div id="email-container" className={"small-text signin-signup-frame-account " + verify_hide_inputs}>
                <input className="signin-signup-frame-account-input remove-underline" placeholder="Email" 
                      type="text" name="email" id="email" onChange={handleChange}>
                </input>
              </div>
              <div className={errors.email ? "show-flex" : "show-flex hidden"}><div className="error-icon"></div><span>{`${errors.email}`}</span></div>

              <div id="password-container" className={"small-text signin-signup-frame-account " + verify_hide_inputs}>
                <input className="signin-signup-frame-account-input remove-underline" placeholder="Mật khẩu" 
                      type="password" name="password" id="password" onChange={handleChange}>
                </input>
              </div>
              <div className={errors.password ? "show-flex" : "show-flex hidden"}><div className="error-icon"></div><span>{`${errors.password}`}</span></div>

              <div id="retype-password-container" className={"small-text signin-signup-frame-account " + props.pass_retype + verify_hide_inputs}>
                <input className="signin-signup-frame-account-input remove-underline" placeholder="Nhập lại mật khẩu" 
                       type="password" name="retype_password" id="retype-password" onChange={handleChange}>
                </input>
              </div>
              <div className={errors.retypePassword ? "show-flex" : "show-flex hidden" + verify_hide_inputs}><div className="error-icon"></div><span>{`${errors.retypePassword}`}</span></div>
              
              <div className={"signin-signup-frame-checkbox " + verify_hide_inputs}>
                <input type="checkbox" id="remember" name="remember" className="checkbox"></input><span className="signin-signup-frame-new-checkbox" onClick={handleClick}></span>
                <label htmlFor="remember" className="small-text checkbox-text">{props.checkbox_message}</label>            
              </div>
              <button className={"grey-18-normal-text orange-button "+ signup_margin_reduced + verify_hide_inputs} disabled={isCheckedBox}><span className="signin-signup-button">{props.submit_message}</span></button>
            </form>

            <div className={"grey-18-normal-text orange-button " + verify_message_show} onClick={handleGoSignIn}><span className="signin-signup-button" >Quay lại trang Đăng nhập</span></div>
            <div className={"small-text signin-signup-ask "+ signup_margin_reduced}>
              <div className="account-ask">
                {props.account_ask}
              </div>
              <div onClick={handleGoToDo} className="todo-ask remove-underline" >
                {props.todo_ask}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    )
}

export default Frame;