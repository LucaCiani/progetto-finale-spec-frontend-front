import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import GlobalProvider from "./contexts/GlobalContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import DefaultLayout from "./assets/layouts/DefaultLayout";
import NotFoundPage from "./assets/pages/NotFoundPage";
import SingleProductPage from "./assets/pages/SingleProductPage";
import ComparatorPage from "./assets/pages/ComparatorPage";
import SavedProductsPage from "./assets/pages/SavedProductsPage";

function App() {
    return (
        <>
            <GlobalProvider>
                <BrowserRouter>
                    <Routes>
                        <Route Component={DefaultLayout}>
                            <Route path="/" Component={HomePage} />
                            <Route path="/:id" Component={SingleProductPage} />
                            <Route
                                path="/comparator"
                                Component={ComparatorPage}
                            />
                            <Route
                                path="/saved-products"
                                Component={SavedProductsPage}
                            />
                            <Route path="*" Component={NotFoundPage} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </GlobalProvider>
        </>
    );
}

export default App;
