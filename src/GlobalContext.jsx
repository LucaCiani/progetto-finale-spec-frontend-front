import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [iphones, setIphones] = useState([]);

    const [ipads, setIpads] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001" + "/iphones")
            .then((res) => res.json())
            .then((data) => setIphones(data))
            .catch((err) => console.error(err));

        fetch("http://localhost:3001" + "/ipads")
            .then((res) => res.json())
            .then((data) => setIpads(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <GlobalContext.Provider
            value={{ iphones, setIphones, ipads, setIpads }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider };
