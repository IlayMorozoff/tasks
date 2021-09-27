import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="nav__wrapper">
        <nav className="nav" data-testid="nav">
          <div className="links__list">
            <div className="item">
              <NavLink to="/" exact className="link" activeClassName="selected" data-testid="home">
                Home
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to="/about"
                exact
                className="link"
                activeClassName="selected"
                data-testid="about"
              >
                About
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
