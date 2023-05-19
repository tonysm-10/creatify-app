import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Logout = () => {
  // function to handle user logout
const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
};
    return (
    <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
            <div className="card">
            <h4 className="card-header bg-dark text-light p-2">Logout</h4>
            <div className="card-body">
                <p>
                You are currently logged in! Do you want to logout? If so, please click the logout button.
                </p>
                <button
                className="btn btn-block btn-primary"
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
                >
                Logout
                </button>
                <p className="mt-3">
                <Link to="/">Go back to the homepage.</Link>
                </p>
            </div>
        </div>
        </div>
    </main>
);
};
export default Logout;
