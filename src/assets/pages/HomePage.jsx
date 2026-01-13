import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function HomePage() {
    const { iphones, ipads } = useContext(GlobalContext);

    return (
        <>
            <h1 className="text-ceneter py-5">Hello World!</h1>
        </>
    );
}
