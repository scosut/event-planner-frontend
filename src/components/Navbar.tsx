import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <nav id="nav">
            <div className="nav-logo">
                <img
                    src={`${import.meta.env.BASE_URL}images/dancer.png`}
                    alt="dancer"
                />
                <div className="nav-logo-text">
                    <h1>biannual retreat</h1>
                    <h2>Hillcrest Dancers</h2>
                </div>
            </div>
            <hr />
            <ul className="nav-links">
                <li>
                    <NavLink to={'/'}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={'/dancers'}>View Dancers</NavLink>
                </li>
                <li>
                    <NavLink to={'/seating'}>Assign Seats</NavLink>
                </li>
                <li>
                    <NavLink to={'/materials'}>Print Materials</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
