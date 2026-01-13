import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { GlobalProvider } from "./GlobalContext";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";

function App() {
    return (
        <>
            <GlobalProvider>
                <BrowserRouter>
                    <nav className="navbar navbar-expand-lg bg-body-secondary">
                        <div className="container-fluid px-4">
                            <Link className="navbar-brand" to="/">
                                <img
                                    className="p-3"
                                    src="/logo.png"
                                    alt="logo"
                                />
                            </Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div
                                className="collapse navbar-collapse"
                                id="navbarSupportedContent"
                            >
                                <input
                                    className="form-control me-2"
                                    type="text"
                                    placeholder="Cerca per nome..."
                                />
                            </div>
                        </div>
                    </nav>
                    <Routes>
                        <Route path="/" Component={HomePage} />
                    </Routes>
                </BrowserRouter>
            </GlobalProvider>
        </>
    );
}

export default App;
