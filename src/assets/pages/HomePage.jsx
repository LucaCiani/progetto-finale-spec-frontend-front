import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
    const { products } = useContext(GlobalContext);
    const [sortOrder, setSortOrder] = useState("az");

    const sortedProducts = useMemo(() => {
        return products
            ? [...products].sort((a, b) => {
                  if (sortOrder === "az") {
                      return a.title.localeCompare(b.title);
                  } else {
                      return b.title.localeCompare(a.title);
                  }
              })
            : [];
    }, [products, sortOrder]);

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
            {sortedProducts.length ? (
                <div className="mb-5 row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5">
                    {sortedProducts.map((product) => (
                        <div key={product.id} className="col">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="text-center">Prodotto non trovato!</h2>
            )}
        </>
    );
}
