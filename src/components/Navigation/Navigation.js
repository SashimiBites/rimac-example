import { useState, useCallback, useEffect }from 'react';
import { useHistory } from "react-router-dom";

const Navigation = () => {
    const [colorChange, setColorChange] = useState(false);
    const [navbarClass, setNavbarClass] = useState('navbar home');
    const history = useHistory();
    const isHome = history.location.pathname === '/';

    const changeNavBackground = useCallback(() => {
        if(window.scrollY !== 0) {
            setColorChange(true);
        } else {
            setColorChange(false);
        }
    }, []);

    useEffect(() => {
        if(isHome) {
            window.addEventListener('scroll', changeNavBackground);

            return () => {
                window.removeEventListener('scroll', changeNavBackground);
            }
        }
    }, [isHome, changeNavBackground]);

    history.listen((location) => {
        if(location.pathname === '/') {
            window.addEventListener('scroll', changeNavBackground);
            setNavbarClass('navbar home');
        } else {
            window.removeEventListener('scroll', changeNavBackground);
            setNavbarClass('navbar');
        }
    });

    return (
        <header className={navbarClass + ' ' + (colorChange ? 'white' : '')}>
            <div className="navbar__inner">
                <img className="navbar__logo" src={process.env.REACT_APP_IMAGE_CDN + 'logo-rimac.svg'} alt="Logo Rimac"/>
                <div className="navbar__right">
                    <p className="desc u-mr-25">¿Tienes alguna duda?</p>
                    <div className="phone">
                        <img className="phone__icon" src={process.env.REACT_APP_IMAGE_CDN + 'icon-phone.svg'} alt="icono telefono"/>
                        <span className="phone__number">(01) 411 6001</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navigation;