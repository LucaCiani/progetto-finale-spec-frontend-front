import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function SavedProductsPage() {
    const { favorites } = useContext(GlobalContext);

    const navigate = useNavigate();

    return (
        <>
            <div>
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    className="btn btn-secondary"
                >
                    &#8592; Torna indietro
                </button>
            </div>
            <h2 className="mb-4 text-center">I tuoi preferiti</h2>
            {favorites.length === 0 ? (
                <p className="text-center">Nessun prodotto nei preferiti.</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5">
                    {favorites.map((product) => (
                        <div key={product.id} className="col">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
