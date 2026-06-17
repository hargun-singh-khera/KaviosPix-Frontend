import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ userData }) => {
    console.log("userData", userData);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-md-5 bg-success">
            <div className="container-fluid">
                <Link to={"/dashboard"} className="navbar-brand" href="#">kaviosPix</Link>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                </div> */}
                <div className="dropdown text-end">
                    <a
                        href="#"
                        className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src={userData?.picture}
                            alt="User"
                            width="32"
                            height="32"
                            className="rounded-circle"
                        />
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end text-small p-2">
                        <li className="px-3 py-2">
                            <div className="fw-bold">
                                {userData?.name}
                            </div>
                            <div className="text-muted small">
                                {userData?.email}
                            </div>
                        </li>

                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li>
                            <button
                                onClick={handleLogout}
                                className="dropdown-item text-danger"
                            >
                                Sign out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header