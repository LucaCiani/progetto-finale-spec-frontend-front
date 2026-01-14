import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <main>
                <div className="container my-5">
                    <Outlet />
                </div>
            </main>
        </>
    );
}
