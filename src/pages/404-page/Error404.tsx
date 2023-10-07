import { NavLink } from 'react-router-dom';
import Error404img from '../../img/404.png'
import './Error404.scss'

function Error404() {
    return (
        <>
            <div className='error-page'>
                <div className='error-page__image'>
                    <img src={Error404img} alt="Error 404" />
                </div>
                <h1 className='error-page__title'>
                    Ops. we couldn't find what you're looking for <br />
                    <span style={{ fontSize: '30px' }}>
                        Grab a drink and go back to&nbsp;
                        <NavLink
                            style={{ color: '#BF6836' }}
                            to="/">
                            Home page
                        </NavLink>
                    </span>
                </h1>
            </div>
        </>
    );
}

export default Error404;