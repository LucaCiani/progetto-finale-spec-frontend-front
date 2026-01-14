import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import ProductCard from "../components/ProductCard";

export default function ComparatorPage() {
    const { comparator, removeFromComparator, clearComparator } =
        useContext(GlobalContext);

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Comparatore Prodotti</h2>
            {comparator.length === 0 ? (
                <p className="text-center">Nessun prodotto nel comparatore.</p>
            ) : (
                <>
                    <div className="d-flex justify-content-center mb-3">
                        <button
                            className="btn btn-danger"
                            onClick={clearComparator}
                        >
                            Svuota comparatore
                        </button>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {comparator.map((product) => (
                            <div key={product.id} className="col">
                                <ProductCard product={product} />
                                <button
                                    className="btn btn-outline-danger w-100 mt-2"
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
        </div>
    );
}
