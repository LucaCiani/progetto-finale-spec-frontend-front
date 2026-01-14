import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

export default function Header() {
    const { setProducts } = useContext(GlobalContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    // RICERCA DEBOUNCATA + RITORNO ALLA HOME

    const deboucedSearch = useCallback(
        debounce((value) => {
            setSearchQuery(value);
            navigate("/");
        }, 500),
        [navigate]
    );

    // RICERCA PER CATEGORIA + RITORNO ALLA HOME

    function handleCategoryChange(e) {
        setSelectedCategory(e.target.value);
        navigate("/");
    }

    // FETCH CON QUERY

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

    const { comparator, favorites } = useContext(GlobalContext);

    return (
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
                        <span className="text-light">CERCA</span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <input
                            className="form-control m-2"
                            type="text"
                            placeholder="Cerca per nome..."
                            onChange={(e) => deboucedSearch(e.target.value)}
                        />
                        <select
                            className="form-select m-2"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Tutti i prodotti</option>
                            <option value="Iphone">Iphone</option>
                            <option value="Ipad">Ipad</option>
                        </select>
                    </div>
                    <Link to="/comparator" className="btn btn-secondary ms-3">
                        Comparatore ({comparator.length}/3)
                    </Link>
                    <Link to="/saved-products" className="btn btn-danger ms-2">
                        Preferiti ({favorites.length})
                    </Link>
                </div>
            </nav>
        </header>
    );
}
