import { memo, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

const ProductCard = memo(({ product }) => {
    const { comparator, addToComparator, toggleFavorite, isFavorite } =
        useContext(GlobalContext);

    // CONTROLLORI

    const isInComparator = useMemo(
        () => comparator.some((p) => p.id === product.id),
        [comparator, product.id]
    );
    const isFull = comparator.length >= 3;

    const favorite = useMemo(
        () => isFavorite(product.id),
        [isFavorite, product.id]
    );

    return (
        <div className="h-100">
            <Link
                to={`/${product.id}`}
                className="link-underline link-underline-opacity-0"
            >
                <div className="card bg-dark ">
                    <img
                        className="card-img-top mt-3"
                        src={product.imagesUrl[0]}
                        alt={product.title}
                    />
                    <div className="card-body text-light h-100">
                        <h5 className="card-title">{product.title}</h5>
                    </div>
                </div>
            </Link>
            <div className="d-flex gap-2 mt-2">
                {/* BOTTONE COMPARATORE */}
                <button
                    className="btn btn-dark flex-fill"
                    disabled={isInComparator || isFull}
                    onClick={() => addToComparator(product)}
                >
                    {isInComparator
                        ? "Nel comparatore"
                        : isFull
                        ? "Comparatore pieno"
                        : "Compara"}
                </button>
                {/* BOTTONE PREFERITI */}
                <button
                    className={`btn flex-fill ${
                        favorite ? "btn-danger" : "btn-outline-danger"
                    }`}
                    onClick={() => toggleFavorite(product)}
                >
                    <span className="fw-bold">{favorite ? "♥" : "♡"}</span>
                </button>
            </div>
        </div>
    );
});

export default ProductCard;
