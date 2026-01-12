import { useState } from "react";

function App() {
    const [iphones, setIphones] = useState([]);

    fetch("http://localhost:3001" + "/iphones")
        .then((res) => res.json())
        .then((data) => console.log(data));

    return <></>;
}

export default App;
