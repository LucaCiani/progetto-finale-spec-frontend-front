import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function SingleProductPage() {
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState();
    const { comparator, addToComparator } = useContext(GlobalContext);

    useEffect(() => {
        fetch(`http://localhost:3001/products/${id}`)
            .then((res) => res.json())
            .then((data) => setSingleProduct(data));
    }, [id]);

    const isInComparator =
        singleProduct &&
        comparator.some((p) => p.id === singleProduct.product.id);
    const isFull = comparator.length >= 3;

    console.log(singleProduct);

    if (singleProduct) {
        return (
            <>
                <div className="my-5 badge text-bg-dark text-wrap d-flex justify-content-center">
                    <p className="h1  ">{singleProduct.product.title}</p>
                </div>
                <button
                    className="btn btn-dark mb-4"
                    disabled={isInComparator || isFull}
                    onClick={() => addToComparator(singleProduct.product)}
                >
                    {isInComparator
                        ? "Nel comparatore"
                        : isFull
                        ? "Comparatore pieno"
                        : "Compara"}
                </button>
                <div className="row row-cols-1 row-cols-xl-2 g-3 mb-5">
                    <div
                        id="carouselExampleIndicators"
                        className="carousel slide col"
                    >
                        <div className="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to="0"
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"
                            ></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    src={singleProduct.product.imagesUrl[0]}
                                    className="d-block"
                                    alt={singleProduct.product.title}
                                />
                            </div>
                            <div className="carousel-item">
                                <img
                                    src={singleProduct.product.imagesUrl[1]}
                                    className="d-block"
                                    alt={singleProduct.product.title}
                                />
                            </div>
                            <div className="carousel-item">
                                <img
                                    src={singleProduct.product.imagesUrl[2]}
                                    className="d-block"
                                    alt={singleProduct.product.title}
                                />
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="col row row-cols-1 row-cols-lg-2 mt-5">
                        <div className="col text-light">
                            <p className="p-3 bg-dark">
                                <b>ANNO DI USCITA</b>:{" "}
                                {singleProduct.product.anno}
                            </p>
                            <p className="p-3 bg-dark">
                                <b>CHIP</b>: {singleProduct.product.chip}
                            </p>
                            <p className="p-3 bg-dark">
                                <b>DISPLAY</b>: {singleProduct.product.display}
                            </p>
                            <p className="p-3 bg-dark">
                                <b>MEMORIE</b>: {singleProduct.product.memorie}
                            </p>
                            <p className="p-3 bg-dark">
                                <b>CONNETTORI</b>:{" "}
                                {singleProduct.product.connettori}
                            </p>
                        </div>
                        <div className="col text-light">
                            <p className="p-3 bg-dark">
                                <b>DIMENSIONI</b>:{" "}
                                {singleProduct.product.dimensioni}
                            </p>
                            <p className="p-3 bg-dark">
                                <b>PESO</b>: {singleProduct.product.peso}
                            </p>
                            <p className="p-3 bg-dark">
                                <b>FOTO POSTERIORI</b>:{" "}
                                {singleProduct.product.fotocamerePosteriori}
                            </p>
                            <p className="p-3 bg-dark">
                                <b>FOTO FRONTALE</b>:{" "}
                                {singleProduct.product.fotocameraFrontale}
                            </p>
                            <p className="p-3 bg-dark">
                                <b>BLUETOOTH</b>:{" "}
                                {singleProduct.product.bluetooth}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
