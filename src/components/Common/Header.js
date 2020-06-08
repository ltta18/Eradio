import React from 'react';
import history from '../../history';

class Header extends React.Component {
    handleGoHome = () => {
        history.push('/');
    }

    render() {
        return (
            <div className="header no-blackout" onClick={this.handleGoHome}>
                <div id="eradio-logo" alt="eradio_logo"></div>
                <div id="eradio">Eradio</div>
            </div> 
        )
    }
}


export default Header;