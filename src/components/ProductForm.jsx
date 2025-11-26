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
            id: selectedProduct ? selectedProduct.id : Date.now(), // ID único
            name,
            category,
            qty: Number(qty),
            limit: Number(limit),
        };

        onSave(product);
        // Limpiar campos si es un nuevo producto
        if (!selectedProduct) {
            setName("");
            setCategory("");
            setQty(0);
            setLimit(0);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <div>
                <label>Nombre: </label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Categoría: </label>
                <input value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            <div>
                <label>Cantidad: </label>
                <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} required />
            </div>
            <div>
                <label>Límite: </label>
                <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} required />
            </div>
            <div style={{ marginTop: "10px" }}>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>Cancelar</button>
            </div>
        </form>
    );
};

export default ProductForm;

