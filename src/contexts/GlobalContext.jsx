import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [comparator, setComparator] = useState([]);

    // CONTROLLO SE CI SONO GIà DEI PREFERITI

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    function addToComparator(product) {
        setComparator((prev) => {
            if (prev.find((p) => p.id === product.id) || prev.length >= 3)
                return prev;
            return [...prev, product];
        });
    }

    // PULIZIA COMPARATORE

    function removeFromComparator(id) {
        setComparator((prev) => prev.filter((p) => p.id !== id));
    }

    function clearComparator() {
        setComparator([]);
    }

    function toggleFavorite(product) {
        setFavorites((prev) => {
            if (prev.find((p) => p.id === product.id)) {
                return prev.filter((p) => p.id !== product.id);
            } else {
                return [...prev, product];
            }
        });
    }

    function isFavorite(id) {
        return favorites.some((p) => p.id === id);
    }

    return (
        <GlobalContext.Provider
            value={{
                products,
                setProducts,
                comparator,
                addToComparator,
                removeFromComparator,
                clearComparator,
                favorites,
                toggleFavorite,
                isFavorite,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
