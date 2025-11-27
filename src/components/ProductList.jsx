import React from "react";

const ProductList = ({ products, onIncrement, onDecrement, onEdit, onDelete }) => {
    // Agrupar productos por categoría
    const grouped = products.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <div>
            {Object.keys(grouped).map((category) => (
                <div key={category} className="category-block">
                    <h3>{category.toUpperCase()}</h3>
                    <hr />
                    {grouped[category].map((product) => (
                        <div key={product.id} className="product-row">

                            {/* ------------------------- */}
                            {/*   ICONOS + NOMBRE         */}
                            {/* ------------------------- */}
                            <div className="product-info">
                                <span className="edit-btn" onClick={() => onEdit(product)}>
                                    ✏️
                                </span>
                                <span className="delete-btn" onClick={() => onDelete(product.id)}>
                                    🗑️
                                </span>
                                <span>{product.name}</span>
                            </div>

                            {/* ------------------------- */}
                            {/*       CANTIDAD + BOTONES + STOCK  */}
                            {/* ------------------------- */}
                            <div className="product-actions">
                                <span className="product-qty">{product.qty}u</span>
                                <button onClick={() => onDecrement(product.id)}>-</button>
                                <button onClick={() => onIncrement(product.id)}>+</button>
                                <span className={`stock-status ${product.qty <= product.limit ? "low-stock" : "ok-stock"}`}>
                                    {product.qty <= product.limit ? "⚠️ BAJO STOCK" : "⚪ OK"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ProductList;

