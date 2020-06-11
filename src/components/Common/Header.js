import React from 'react';
import history from '../../history';

const Header = () => {
    const handleGoHome = () => {
        history.push('/');
    }

    return (
        <div className="header no-blackout" onClick={handleGoHome}>
            <div id="eradio-logo" alt="eradio_logo"></div>
            <div id="eradio">Eradio</div>
        </div> 
    )
}


export default Header;