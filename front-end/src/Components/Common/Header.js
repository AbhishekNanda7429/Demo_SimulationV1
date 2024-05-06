import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header()
{
    const [activeSection, setActiveSection] = useState('');

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

    return(
        <React.Fragment>
             <nav className="navbar">
                <div className="container">
                <div className="row">
                <div className="col-md-12">
              <h5 className="mt-0">MENU</h5>
              <ul className="navbar-nav">
                <li
                  className="nav-item"
                  onClick={() => handleSectionClick('home')}
                >
                  <Link
                    to="/"
                    className={`nav-link ${
                      activeSection === 'home' ? 'active' : ''
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => handleSectionClick('caselist')}
                >
                  <Link
                    to="/tabledata"
                    className={`nav-link ${
                      activeSection === 'caselist' ? 'active' : ''
                    }`}
                  >
                    Case List
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => handleSectionClick('caseform')}
                >
                  <Link
                    to="/caseform"
                    className={`nav-link ${
                      activeSection === 'caseform' ? 'active' : ''
                    }`}
                  >
                    New Case Form
                  </Link>
                </li>
              </ul>
            </div>
                </div>
                </div>

            </nav>
        </React.Fragment>
    );
}

export default Header;