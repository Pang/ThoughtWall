import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const NavBar = () => {

    return (
        <header className="App-header">
            <nav className="navbar navbar-light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0">
                        <Link to="/" style={{ textDecoration: 'none'}}>
                            <span className="appTitleBtn h2 text-light">Thoughtwall</span>
                        </Link> &nbsp; 
                        <span className="h6 text-secondary"><i>Hello, user!</i></span>
                    </span>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <Link to="/Account"><span className="accountIcon"><CgProfile /></span></Link>
                    </form>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;