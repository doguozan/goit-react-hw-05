import { NavLink } from "react-router";
import styles from "./Navigation.module.css";

function Header() {
    return (
        <nav className={styles.nav}>
            <NavLink
                className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                }
                to="/"
            >
                Home
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                }
                to="/movies"
            >
                Movies
            </NavLink>
        </nav>
    );
}

export default Header;
