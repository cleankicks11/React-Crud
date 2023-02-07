import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
            <Link className="nav-link" to="/">
                Member List
            </Link>
        </li>
        <li>
            <Link className="nav-link" to="/addmembers">
                Add Member
            </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;
