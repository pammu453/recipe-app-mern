import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [cookies, setCookies] = useCookies(['access_token']);
    const navigate=useNavigate();

    const logout=()=>{
        setCookies('access_token',"")
        window.localStorage.removeItem('userId');
        navigate('/auth');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">foodyRecepe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create-recipe">Create Recipe</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/saved-recipe">Saved Recipe</Link>
                        </li>
                        {!cookies.access_token ? (
                            <li className="nav-item ">
                                <Link className="nav-link" to="/auth">Register/Login</Link>
                            </li>
                        ):
                        <button onClick={logout}>Logout</button>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
