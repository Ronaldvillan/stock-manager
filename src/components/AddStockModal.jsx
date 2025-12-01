import React, { useEffect, useRef, useState } from "react";

const AddStockModal = ({ product, onConfirm, onCancel }) => {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const inputRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        // focus al abrir
        if (inputRef.current) inputRef.current.focus();
        const onKey = (e) => {
            if (e.key === "Escape") onCancel();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onCancel]);

    const handleConfirm = () => {
        const n = Number(amount);
        if (!Number.isFinite(n) || n <= 0) {
            setError("Ingresá una cantidad válida mayor que 0");
            return;
        }
        setError("");
        onConfirm(n);
    };

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onCancel();
    };

    return (
        <div
            className="addstock-overlay"
            ref={overlayRef}
            onMouseDown={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-label={`Agregar unidades a ${product?.name || "producto"}`}
        >
            <div className="addstock-card" onMouseDown={(e) => e.stopPropagation()}>
                <h3 className="addstock-title">Agregar unidades</h3>
                <div className="addstock-sub">
                    <strong>Producto:</strong> {product?.name || "-"}
                </div>
                <div className="addstock-sub">
                    <strong>Stock actual:</strong> {product?.qty ?? 0}u
                </div>

                <label className="addstock-label">Cantidad a agregar</label>
                <input
                    ref={inputRef}
                    className="addstock-input"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Ej: 30"
                />
                {error && <div className="addstock-error">{error}</div>}

                <div className="addstock-actions">
                    <button className="btn-cancel" onClick={onCancel} type="button">
                        Cancelar
                    </button>
                    <button className="btn-confirm" onClick={handleConfirm} type="button">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddStockModal;
