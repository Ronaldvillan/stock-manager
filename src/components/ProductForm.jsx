// src/components/ProductForm.jsx

import React, { useEffect, useState } from "react";

const ProductForm = ({ selectedProduct, onSave, onCancel }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [qty, setQty] = useState(0);
    const [limit, setLimit] = useState(0);

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setCategory(selectedProduct.category);
            setQty(selectedProduct.qty);
            setLimit(selectedProduct.limit);
        }
    }, [selectedProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const product = {
            id: selectedProduct ? selectedProduct.id : Date.now(),
            name,
            category,
            qty: Number(qty),
            limit: Number(limit),
        };

        onSave(product);

        if (!selectedProduct) {
            setName("");
            setCategory("");
            setQty(0);
            setLimit(0);
        }
    };

    return (
        <form className="form-card" onSubmit={handleSubmit}>
            <h3 className="form-title">
                {selectedProduct ? "Editar producto" : "Nuevo producto"}
            </h3>

            <div className="form-group">
                <label>Nombre</label>
                <input
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Categoría</label>
                <input
                    className="form-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Cantidad</label>
                <input
                    className="form-input"
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Límite</label>
                <input
                    className="form-input"
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    required
                />
            </div>

            <div className="form-buttons">
                <button type="submit" className="btn-save">Guardar</button>
                <button type="button" className="btn-cancel" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
