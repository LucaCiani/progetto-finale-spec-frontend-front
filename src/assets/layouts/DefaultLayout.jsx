import { useCallback, useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
    const { setProducts } = useContext(GlobalContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    const deboucedSearch = useCallback(
        debounce((value) => {
            setSearchQuery(value);
            navigate("/");
        }, 500),
        [navigate]
    );

    function handleCategoryChange(e) {
        setSelectedCategory(e.target.value);
        navigate("/");
    }

    useEffect(() => {
        let url = "http://localhost:3001/products";
        const params = [];
        if (searchQuery) params.push(`search=${searchQuery}`);
        if (selectedCategory) params.push(`category=${selectedCategory}`);
        if (params.length) url += "?" + params.join("&");

        fetch(url)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    }, [searchQuery, selectedCategory, setProducts]);

    const { comparator } = useContext(GlobalContext);

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg text-bg-dark">
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
                            <span className="text-light">APRI</span>
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
                            <select
                                className="form-select ms-2"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">Tutte i prodotti</option>
                                <option value="Iphone">Iphone</option>
                                <option value="Ipad">Ipad</option>
                            </select>
                        </div>
                        <Link to="/comparator" className="btn btn-warning ms-3">
                            Comparatore ({comparator.length}/3)
                        </Link>
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
