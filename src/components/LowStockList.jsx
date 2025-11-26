// src/components/LowStockList.jsx

import React from "react";

const LowStockList = ({ products }) => {
    // Filtrar productos bajo stock
    const lowStock = products.filter(p => p.qty <= p.limit);

    if (lowStock.length === 0) return <p>Todos los productos están OK ✅</p>;

    // Agrupar por categoría
    const grouped = lowStock.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <div>
            <h3>Productos con bajo stock</h3>
            <hr />
            {Object.keys(grouped).map(category => (
                <div key={category} style={{ marginBottom: "15px" }}>
                    <strong>{category}</strong>
                    <hr />
                    {grouped[category].map(p => (
                        <div key={p.id} style={{ marginBottom: "5px" }}>
                            {p.name} .......... {p.qty}u (Límite: {p.limit}u)
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default LowStockList;
