import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
    const { products } = useContext(GlobalContext);
    const [detailedProducts, setDetailedProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("az");
    const [loading, setLoading] = useState(false);

    // FETCH DETTAGLIATO DI TUTTI I PRODOTTI
    useEffect(() => {
        async function fetchDetails() {
            if (!products || products.length === 0) {
                setDetailedProducts([]);
                return;
            }
            setLoading(true);
            const results = await Promise.all(
                products.map(async (product) => {
                    const res = await fetch(
                        `http://localhost:3001/products/${product.id}`
                    );
                    if (!res.ok) return null;
                    return await res.json();
                })
            );
            // FILTRO EVENTUALI FETCH NULL (fetch falliti)
            setDetailedProducts(results.filter(Boolean));
            setLoading(false);
        }
        fetchDetails();
    }, [products]);

    // ORDINAMENTO
    const sortedProducts = useMemo(() => {
        return detailedProducts.length
            ? [...detailedProducts].sort((a, b) => {
                  if (sortOrder === "az") {
                      return a.product.title.localeCompare(b.product.title);
                  } else {
                      return b.product.title.localeCompare(a.product.title);
                  }
              })
            : [];
    }, [detailedProducts, sortOrder]);

    return (
        <>
            <div className="my-5 badge text-bg-dark text-wrap d-flex justify-content-center">
                <p className="h1">ISPEZIONA E CONFRONTA I PRODOTTI!</p>
            </div>
            <div className="mb-4 d-flex justify-content-end">
                <select
                    className="form-select text-bg-dark w-auto"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="az">Ordina: A-Z</option>
                    <option value="za">Ordina: Z-A</option>
                </select>
            </div>
            {loading ? (
                <h2 className="text-center">Caricamento...</h2>
            ) : sortedProducts.length ? (
                <div className="mb-5 row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5">
                    {sortedProducts.map((detailed) => (
                        <div key={detailed.product.id} className="col">
                            <ProductCard product={detailed.product} />
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="text-center">Prodotto non trovato!</h2>
            )}
        </>
    );
}
