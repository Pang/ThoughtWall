const SideNav = () => {

    return (
        <div>
            <div className="d-flex flex-column flex-shrink-0 p-3 mt-5 sideNav">
                <ul className="nav nav-pills flex-column mb-auto mt-2">
                    <li className="nav-item">
                        <a href="#a" className="nav-link active">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#b" className="nav-link">
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="#c" className="nav-link">
                            Orders
                        </a>
                    </li>
                    <li>
                        <a href="#d" className="nav-link">
                            Products
                        </a>
                    </li>
                    <li>
                        <a href="#e" className="nav-link">
                            Customers
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default SideNav;