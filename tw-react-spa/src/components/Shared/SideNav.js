import { Link } from 'react-router-dom';

const SideNav = () => {
    return (
        <div>
            <div className="d-flex flex-column flex-shrink-0 p-3 mt-5 sideNav">
                <ul className="nav nav-pills flex-column mb-auto mt-2">
                    <li className="nav-item">
                        <Link to="/">
                            <span className="nav-link active">
                                Home
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/account">
                            <span className="nav-link">
                                Dashboard
                            </span>
                        </Link>
                    </li>
                    <li>
                        <span className="nav-link">
                            Orders
                        </span>
                    </li>
                    <li>
                        <span className="nav-link">
                            Products
                        </span>
                    </li>
                    <li>
                        <span className="nav-link">
                            Customers
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default SideNav;