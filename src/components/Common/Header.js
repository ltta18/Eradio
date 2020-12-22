import React from 'react';
import history from '../../history';

const Header = () => {
    const handleGoHome = () => {
        history.push('/');
    }

    return (
        <div className="header no-blackout black-gr" onClick={handleGoHome}>
            {/* <img src={logo} alt="Logo" /> */}
            <div id="eradio-logo"></div>
            {/* <div id="eradio">Viet Voice</div> */}
        </div> 
    )
}


export default Header;