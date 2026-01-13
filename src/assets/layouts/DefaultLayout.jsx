import { useCallback, useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}

export default function DefaultLayout() {
    const { setIphones, setIpads } = useContext(GlobalContext);

    const [searchQuery, setSearchQuery] = useState("");
    const deboucedSearch = useCallback(debounce(setSearchQuery, 500), []);

    useEffect(() => {
        fetch("http://localhost:3001" + `/iphones?search=${searchQuery}`)
            .then((res) => res.json())
            .then((data) => setIphones(data))
            .catch((err) => console.error(err));

        fetch("http://localhost:3001" + `/ipads?search=${searchQuery}`)
            .then((res) => res.json())
            .then((data) => setIpads(data))
            .catch((err) => console.error(err));
    }, [deboucedSearch]);

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-secondary">
                    <div className="container-fluid px-4">
                        <Link className="navbar-brand" to="/">
                            <img className="p-3" src="/logo.png" alt="logo" />
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
                                onChange={(e) => deboucedSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </>
    );
}
