import { FaSearch } from 'react-icons/fa';

const NavBar = () => {

    return (
        <header className="App-header">
            <nav className="navbar navbar-light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0">
                        <span className="h2 text-light">Thoughtwall &nbsp;
                            <span className="h6 text-secondary"><i>Hello, user!</i></span>
                        </span>
                    </span>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-secondary" type="submit"><FaSearch className="searchBtnIcon" /></button>
                    </form>
                </div>
                
            </nav>
        </header>
    );
}

export default NavBar;