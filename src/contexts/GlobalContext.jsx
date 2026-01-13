import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <GlobalContext.Provider value={{ products, setProducts }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider };
