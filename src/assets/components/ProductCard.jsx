import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

const ProductCard = memo(({ product }) => {
    const { comparator, addToComparator } = useContext(GlobalContext);
    const isInComparator = comparator.some((p) => p.id === product.id);
    const isFull = comparator.length >= 3;

    return (
        <div>
            <Link
                to={`/${product.id}`}
                className="link-underline link-underline-opacity-0"
            >
                <div className="card bg-dark h-100">
                    <img
                        className="card-img-top mt-3"
                        src={product.imagesUrl[0]}
                        alt={product.title}
                    />
                    <div className="card-body text-light">
                        <h5 className="card-title">{product.title}</h5>
                    </div>
                </div>
            </Link>
            <button
                className="btn btn-dark w-100 mt-2"
                disabled={isInComparator || isFull}
                onClick={() => addToComparator(product)}
            >
                {isInComparator
                    ? "Nel comparatore"
                    : isFull
                    ? "Comparatore pieno"
                    : "Compara"}
            </button>
        </div>
    );
});

export default ProductCard;
