import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function ComparatorPage() {
    const { comparator, removeFromComparator, clearComparator } =
        useContext(GlobalContext);

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
            <h2 className="mb-4 text-center">Comparatore Prodotti</h2>
            {comparator.length === 0 ? (
                <p className="text-center">Nessun prodotto nel comparatore.</p>
            ) : (
                <>
                    <div className="d-flex justify-content-center mb-3">
                        <button
                            className="btn btn-outline-danger"
                            onClick={clearComparator}
                        >
                            Svuota comparatore
                        </button>
                    </div>
                    <div className="row row-cols-1 row-cols-lg-3 g-4">
                        {comparator.map((product) => (
                            <div key={product.id} className="col mb-5">
                                <ProductCard product={product} />
                                <button
                                    className="btn btn-warning w-100"
                                    onClick={() =>
                                        removeFromComparator(product.id)
                                    }
                                >
                                    Rimuovi
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
