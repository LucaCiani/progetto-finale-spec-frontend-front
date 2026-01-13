import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SingleProductPage() {
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState();

    useEffect(() => {
        fetch(`http://localhost:3001/products/${id}`)
            .then((res) => res.json())
            .then((data) => setSingleProduct(data));
    }, []);

    const navigate = useNavigate();

    if (singleProduct) {
        return (
            <>
                <div className="my-5 badge text-bg-dark text-wrap d-flex justify-content-center">
                    <p className="h1  ">{singleProduct.product.title}</p>
                </div>
                <div className="d-flex">
                    <div
                        id="carouselExampleIndicators"
                        className="carousel slide w-50"
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
                                    className=""
                                    alt={singleProduct.product.title}
                                />
                            </div>
                            <div className="carousel-item">
                                <img
                                    src={singleProduct.product.imagesUrl[1]}
                                    className=""
                                    alt={singleProduct.product.title}
                                />
                            </div>
                            <div className="carousel-item">
                                <img
                                    src={singleProduct.product.imagesUrl[2]}
                                    className=""
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
                    <div className="w-50">
                        <div className="p-3 bg-dark text-light">
                            ANNO DI USCITA: {singleProduct.product.anno}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
