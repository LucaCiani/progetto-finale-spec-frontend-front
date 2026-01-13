import { memo } from "react";
import { Link } from "react-router-dom";

const ProductCard = memo(({ product }) => {
    return (
        <Link
            to={`/${product.id}`}
            className="link-underline link-underline-opacity-0"
        >
            <div className="card bg-dark">
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
    );
});

export default ProductCard;
