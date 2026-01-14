import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function SingleProductPage() {
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState();
    const navigate = useNavigate();
    const { comparator, addToComparator, toggleFavorite, isFavorite } =
        useContext(GlobalContext);

    // FETCH DEL SINGOLO PRODOTTO

    useEffect(() => {
        fetch(`http://localhost:3001/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then((data) => setSingleProduct(data))
            .catch(() => navigate("percorso-inesistente"));
    }, [id, navigate]);

    // CONTROLLORI

    const isInComparator = useMemo(
        () =>
            singleProduct &&
            comparator.some((p) => p.id === singleProduct.product.id),
        [singleProduct, comparator]
    );
    const isFull = comparator.length >= 3;

    const favorite = useMemo(
        () => singleProduct && isFavorite(singleProduct.product.id),
        [singleProduct, isFavorite]
    );
    console.log(singleProduct);

    if (singleProduct) {
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
                <div className="my-5 badge text-bg-dark text-wrap d-flex justify-content-center">
                    <p className="h1  ">{singleProduct.product.title}</p>
                </div>
                <button
                    className="btn btn-dark m-3"
                    disabled={isInComparator || isFull}
                    onClick={() => addToComparator(singleProduct.product)}
                >
                    {isInComparator
                        ? "Nel comparatore"
                        : isFull
                        ? "Comparatore pieno"
                        : "Compara"}
                </button>
                <button
                    className={`btn flex-fill m-3 ${
                        favorite ? "btn-danger" : "btn-outline-danger"
                    }`}
                    onClick={() => toggleFavorite(singleProduct.product)}
                >
                    <span className="fw-bold">{favorite ? "♥" : "♡"}</span>
                </button>
                <div className="row row-cols-1 row-cols-xxl-2 g-3 mb-5">
                    {/* --CAROSELLO-- */}
                    <div className="col">
                        <div
                            id="carouselExampleIndicators"
                            className="carousel slide"
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
                                        className="d-block mx-auto max-widht-100"
                                        alt={singleProduct.product.title}
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src={singleProduct.product.imagesUrl[1]}
                                        className="d-block mx-auto max-widht-100"
                                        alt={singleProduct.product.title}
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src={singleProduct.product.imagesUrl[2]}
                                        className="d-block mx-auto max-widht-100"
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
                                <span className="visually-hidden">
                                    Previous
                                </span>
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
                    </div>
                    <div className="col mt-5">
                        <div className="row row-cols-1 row-cols-md-2 text-center max-w-100">
                            <div className="col text-light">
                                <p className="p-3 bg-dark">
                                    <b>ANNO DI USCITA</b>:{" "}
                                    {singleProduct.product.anno}
                                </p>
                                <p className="p-3 bg-dark">
                                    <b>CHIP</b>: {singleProduct.product.chip}
                                </p>
                                <p className="p-3 bg-dark">
                                    <b>DISPLAY</b>:{" "}
                                    {singleProduct.product.display}
                                </p>
                                <p className="p-3 bg-dark">
                                    <b>MEMORIE</b>:{" "}
                                    {singleProduct.product.memorie}
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
                </div>
            </>
        );
    }
}
