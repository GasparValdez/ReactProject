import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    let user = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();

    function logOut() {
        localStorage.clear();
        navigate('/login');
    }

    return (
       
        <div>
             <br></br>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <button className='navbar-toggler' data-bs-toggle="collapse"
                    data-bs-target="#navbarm" aria-controls='navbarm' aria-expanded="false"
                        aria-label='Toggle navigation'>
                            <span className='navbar-toggler-icon'></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-center" id='navbarm'>
                    <ul className='navbar-nav'>
                    {localStorage.getItem('user-info') ? (
                        <>
                            <Link to="/" className="nav-link text-white">Inicio</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Registrarse</Link>
                        </>
                    )}
             
                {localStorage.getItem('user-info') ? (
                    <Nav className="ms-auto">
                        <NavDropdown title={user && user.name} align="end">
                            <NavDropdown.Item onClick={logOut}>Cerrar sesión</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                ) : null}
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  );
}

export default Header;
