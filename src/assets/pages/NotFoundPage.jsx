import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="d-flex flex-column justify-content-center">
                <h2 className="text-center py-5">Prodotto non trovato!</h2>
                <button
                    className="mx-auto btn btn-primary"
                    onClick={() => navigate("/")}
                >
                    Torna alla Home
                </button>
            </div>
        </>
    );
}
