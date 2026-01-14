import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import ProductCard from "../components/ProductCard";

export default function SavedProductsPage() {
    const { favorites } = useContext(GlobalContext);

    return (
        <>
            <h2 className="mb-4 text-center">I tuoi preferiti</h2>
            {favorites.length === 0 ? (
                <p className="text-center">Nessun prodotto nei preferiti.</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4">
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
