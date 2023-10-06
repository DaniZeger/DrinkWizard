import { NavLink } from 'react-router-dom';
import Error404img from '../img/404.png'

function Error404() {
    return (
        <>
            <h1>404</h1>
            {/* <div style={{ height: '86.5vh', background: 'black' }}>
                <div className='d-flex justify-content-center pt-5'>
                    <img src={Error404img} alt="Error 404" />
                </div>
                <h1 className='text-center w-75 m-auto' style={title}>
                    Ops. we couldn't find what you're looking for <br />
                    <span style={{ fontSize: '30px' }}>
                        Grab a drink and go back to&nbsp;
                        <NavLink
                            style={{ color: 'var(--Wooden-desk-of-bar--3-hex)' }}
                            to="/">
                            Home page
                        </NavLink>
                    </span>
                </h1>
            </div> */}
        </>
    );
}

export default Error404;