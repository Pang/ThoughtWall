import { FaSearch } from 'react-icons/fa';

const Header = () => {

    return (
        <header className="App-header">
            <nav className="navbar navbar-light bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0">
                        <span className="h2 text-light">Thoughtwall &nbsp;
                            <span className="h6 text-secondary"><i>Share your thoughts</i></span>
                        </span>
                    </span>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-primary" type="submit"><FaSearch style={{ fontSize: '16px'}} /></button>
                    </form>
                </div>
                
            </nav>
        </header>
    );
}

export default Header;