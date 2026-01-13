import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
    const { products } = useContext(GlobalContext);

    return (
        <>
            <div className="my-5 badge text-bg-dark text-wrap d-flex justify-content-center">
                <p className="h1  ">ISPEZIONA E CONFRONTA I PRODOTTI!</p>
            </div>
            <div className="mb-5 row row-cols-2 row row-cols-md-3 row row-cols-xl-4 g-5">
                {products &&
                    products.map((product) => {
                        return (
                            <div key={product.id} className="col">
                                <ProductCard product={product} />
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
