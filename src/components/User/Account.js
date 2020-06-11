import React from 'react';
import { connect } from 'react-redux';
import { fetchGetUserDetail } from 'api/Action/User/UserDetailAction';
import Loading from 'components/Common/Loading';

const default_state = {
  is_loading: true,
  detail: {}
}

class Account extends React.Component {
  state = default_state;

  componentDidMount = async() => {
    this.setState({is_loading: true})
    const user_detail = await this.props.fetchGetUserDetail(this.props.token);
    if (user_detail) {
      this.setState({detail: user_detail.data, is_loading: false});
    }
  }

  render() {
    const { is_loading, detail: user_detail } = this.state;

    return (
      <div id="account">
        { is_loading ? <Loading /> :
        [
        <div className="me-header">Tài khoản</div>,
        <div className="account-section">
          <div className="account-section-header">Thông tin tài khoản</div>
          <div className="account-section-info">Email: {user_detail.email}</div>
        </div>,
        <div className="account-section">
          <div className="account-section-header">Loại tài khoản</div>
          <div className="account-section-info">{user_detail.type_account}</div>
        </div>,
        <div className="account-section">
          <div className="account-section-header">Thời gian tạo tài khoản</div>
          <div className="account-section-info">{user_detail.registered_on}</div>
        </div>,
        <div className="account-section">
          <div className="account-section-header">Thời hạn sử dụng</div>
          <div className="account-section-info">{user_detail.exp}</div>
        </div>
        ]
        }
      </div>
    )
  }
}

export default connect(null, { fetchGetUserDetail })(Account);