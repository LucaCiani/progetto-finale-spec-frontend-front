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

    // const navigate = useNavigate();
}
