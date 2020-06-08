import React from 'react';
import Header from '../Common/Header';
import validator from 'validator';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchSignIn } from '../../api/Action/User/AuthAction';
import { fetchSignUp } from '../../api/Action/User/SignupAction';

function validateInput(data) {
  let errors = {};

  if (validator.isEmpty(data.email)) {
    errors.email = 'Bắt buộc';
  }
  else if (!validator.isEmail(data.email)) {
    errors.email = 'Email có dạng: example@mail.com'
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Bắt buộc';
  } 

  if (history.location.pathname === '/signup') {
    if (validator.isEmpty(data.retype_password)) {
      errors.retype_password = 'Bắt buộc';
    }
    if (data.retype_password !== data.password) {
      errors.retype_password = 'Mật khẩu không khớp';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      retype_password: '',
      password: '',
      is_loading: false,
      errors: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors })
    }
    return isValid;
  }

  handleChange(e) {
    if (e.target.id === 'retype-password') this.setState({retype_password: e.target.value});
    else this.setState({[e.target.id]: e.target.value});
    var e_change = document.getElementById(e.target.id+'-container');
    e_change.style.borderColor = 'rgba(0, 0, 0, 0.1)';
  }

  handleClick() {
    var button = document.getElementById('remember');
    if (button.checked === false) {
      button.checked = 'checked';
      if (this.props.checkbox_message !== "Nhớ tài khoản của tôi") this.setState({is_loading: false});
    }
    else {
      button.checked = '';
      if (this.props.checkbox_message !== "Nhớ tài khoản của tôi") this.setState({is_loading: true});
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    var valid = this.isValid();
    var checkbox = document.getElementsByClassName('signin-signup-frame-new-checkbox').item(0);
    var button = document.getElementById('remember');

    if (this.state.errors.email) {
      var email_container = document.getElementById('email-container');
      email_container.style.borderColor = '#cc0000';
    }

    if (this.state.errors.password) {
      var password_container = document.getElementById('password-container');
      password_container.style.borderColor = '#cc0000';
    }

    // if sign up
    if (this.props.checkbox_message !== "Nhớ tài khoản của tôi") {
      if (this.state.errors.retype_password) {
        var retype_password = document.getElementById('retype-password-container');
        retype_password.style.borderColor = '#cc0000';
      }
      if (button.checked === false) {
        checkbox.style.borderColor = '#cc0000';
      }
    }

    if (valid) {
      this.setState({ errors: {}, is_loading: true });
      if (history.location.pathname === '/signin') {
        this.props.fetchSignIn(this.state.email, this.state.password);
      }
      else this.props.fetchSignUp(this.state.email, this.state.password);
      this.setState({ is_loading: false });
    }
  }

  render() {
    // if isVerify, want to show message and hide all input bars
    const verify_message_show = history.location.pathname === "/verify"?"show-flex":"show-none";
    const verify_hide_inputs = history.location.pathname === "/verify"?" show-none":"";
    const signup_margin_reduced = history.location.pathname === '/signup'?"margin-reduced ":"";

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
            <form onSubmit={this.handleSubmit}>
              <div id="email-container" className={"signin-signup-frame-account " + verify_hide_inputs}>
                <input className="signin-signup-frame-account-input remove-underline" placeholder="Email" 
                      type="text" name="email" id="email" onChange={this.handleChange}>
                </input>
              </div>
              <div id="password-container" className={"signin-signup-frame-account " + verify_hide_inputs}>
                <input className="signin-signup-frame-account-input remove-underline" placeholder="Mật khẩu" 
                      type="password" name="password" id="password" onChange={this.handleChange}>
                </input>
              </div>
              <div id="retype-password-container" className={"signin-signup-frame-account " + this.props.pass_retype + verify_hide_inputs}>
                <input className="signin-signup-frame-account-input remove-underline" placeholder="Nhập lại mật khẩu" 
                       type="password" name="retype_password" id="retype-password" onChange={this.handleChange}>
                </input>
              </div>
              
              <div className={"signin-signup-frame-checkbox " + verify_hide_inputs}>
                <input type="checkbox" id="remember" name="remember" className="checkbox"></input><span className="signin-signup-frame-new-checkbox" onClick={this.handleClick}></span>
                <label for="remember" className="checkbox-text">{this.props.checkbox_message}</label>            
              </div>
              <button className={"signin-signup-frame-button "+ signup_margin_reduced + verify_hide_inputs} disabled={this.state.is_loading}><span className="signin-signup-button">{this.props.submit_message}</span></button>
            </form>

            <a className={"signin-signup-frame-button remove-underline " + verify_message_show} href="/signin"><span className="signin-signup-button" >Quay lại trang Đăng nhập</span></a>
            <div className={"signin-signup-ask "+ signup_margin_reduced}>
              <div className="account-ask">
                {this.props.account_ask}
              </div>
              <a href={this.props.href} className="todo-ask remove-underline" >
                {this.props.todo_ask}
              </a>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  if (history.location.pathname === '/signin')
    return {
      fetchSignIn: (email, password) => dispatch(fetchSignIn(email, password)),
    }
  else return {
    fetchSignUp: (email,password) => dispatch(fetchSignUp(email,password))
  }
}

// export default Frame;
export default connect(null, mapDispatchToProps)(Frame);