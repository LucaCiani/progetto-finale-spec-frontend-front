import { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [comparator, setComparator] = useState([]);

    function addToComparator(product) {
        setComparator((prev) => {
            if (prev.find((p) => p.id === product.id) || prev.length >= 3)
                return prev;
            return [...prev, product];
        });
    }

    function removeFromComparator(id) {
        setComparator((prev) => prev.filter((p) => p.id !== id));
    }

    function clearComparator() {
        setComparator([]);
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
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
