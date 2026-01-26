import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Link, useNavigate } from "react-router-dom";

export default function ComparatorPage() {
    const { comparator, removeFromComparator, clearComparator } =
        useContext(GlobalContext);

    const navigate = useNavigate();

    const [detailedProducts, setDetailedProducts] = useState([]);

    // FETCH DEI PRODOTTI SELEZIONATI

    useEffect(() => {
        async function fetchProducts() {
            const products = await Promise.all(
                comparator.map(async (product) => {
                    const res = await fetch(
                        `http://localhost:3001/products/${product.id}`,
                    );
                    if (!res.ok) return null;
                    return await res.json();
                }),
            );
            setDetailedProducts(products.filter(Boolean));
        }
        if (comparator.length > 0) {
            fetchProducts();
        } else {
            setDetailedProducts([]);
        }
    }, [comparator]);

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
                        {detailedProducts.map((singleProduct) => (
                            <div
                                key={singleProduct.product.id}
                                className="col mb-5"
                            >
                                <div className="my-3 badge text-bg-dark text-wrap d-flex justify-content-center">
                                    <p className="h4">
                                        {singleProduct.product.title}
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <Link
                                        to={`/${singleProduct.product.id}`}
                                        className="link-underline link-underline-opacity-0"
                                    >
                                        <img
                                            src={
                                                singleProduct.product
                                                    .imagesUrl[0]
                                            }
                                            className="d-block mx-auto"
                                            alt={singleProduct.product.title}
                                            style={{ maxWidth: "100%" }}
                                        />
                                    </Link>
                                </div>
                                <button
                                    className="btn btn-warning w-100 my-3"
                                    onClick={() =>
                                        removeFromComparator(
                                            singleProduct.product.id,
                                        )
                                    }
                                >
                                    Rimuovi
                                </button>
                                <div className="text-light">
                                    <p className="p-2 bg-dark">
                                        <b>ANNO DI USCITA</b>:{" "}
                                        {singleProduct.product.anno}
                                    </p>
                                    <p className="p-2 bg-dark">
                                        <b>CHIP</b>:{" "}
                                        {singleProduct.product.chip}
                                    </p>
                                    <p className="p-2 bg-dark">
                                        <b>DISPLAY</b>:{" "}
                                        {singleProduct.product.display}
                                    </p>
                                    <p className="p-2 bg-dark">
                                        <b>MEMORIE</b>:{" "}
                                        {singleProduct.product.memorie}
                                    </p>
                                    <p className="p-2 bg-dark">
                                        <b>CONNETTORI</b>:{" "}
                                        {singleProduct.product.connettori}
                                    </p>
                                    <p className="p-2 bg-dark">
                                        <b>DIMENSIONI</b>:{" "}
                                        {singleProduct.product.dimensioni}
                                    </p>
                                    <p className="p-2 bg-dark">
                                        <b>PESO</b>:{" "}
                                        {singleProduct.product.peso}
                                    </p>
                                    <p className="p-2 bg-dark">
                                        <b>FOTO POSTERIORI</b>:{" "}
                                        {
                                            singleProduct.product
                                                .fotocamerePosteriori
                                        }
                                    </p>
                                    <p className="p-2 bg-dark">
                                        <b>FOTO FRONTALE</b>:{" "}
                                        {
                                            singleProduct.product
                                                .fotocameraFrontale
                                        }
                                    </p>
                                    <p className="p-2 bg-dark">
                                        <b>BLUETOOTH</b>:{" "}
                                        {singleProduct.product.bluetooth}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
