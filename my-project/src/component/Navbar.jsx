import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-indigo-600 font-bold">
              U
            </div>
            <span className="text-xl font-semibold">User Management</span>
          </Link>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/create"
              className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-md transition duration-200"
            >
              Add User
            </Link>
          </div>

          <button
            onClick={() => setOpen((s) => !s)}
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <Link
              to="/create"
              className="block px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition duration-150"
            >
              Add User
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
