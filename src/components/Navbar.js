import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

export default function Navbar({ togglemode, mode, type, settype }) {
    const changetofuture=()=>{
        settype("future");
    }
    const changetohistory=()=>{
        settype("history");
    }
    return (
        <>
            <nav className={`navbar navbar-expand-lg bg-${mode} navbar-${mode}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/business-bicolor-icon/weather-109.png" alt="" width="35" height="35" />
                    </Link>
                    <Link className="navbar-brand" to="/current">Weather</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/current">Current</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={changetohistory} to="/history">History</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={changetofuture} to="/history">Future</Link>
                            </li>
                        </ul>
                        <div className={`form-check form-switch mx-3 text-${mode === 'light' ? 'dark' : 'light'}`}>
                            <input className="form-check-input" onClick={togglemode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
