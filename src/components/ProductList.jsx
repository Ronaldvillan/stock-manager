// // src/components/ProductList.jsx

// import React from "react";

// const ProductList = ({ products, onIncrement, onDecrement }) => {
//     // Agrupar productos por categoría
//     const grouped = products.reduce((acc, product) => {
//         if (!acc[product.category]) acc[product.category] = [];
//         acc[product.category].push(product);
//         return acc;
//     }, {});

//     return (
//         <div>
//             {Object.keys(grouped).map((category) => (
//                 <div key={category} style={{ marginBottom: "20px" }}>
//                     <h3>{category.toUpperCase()}</h3>
//                     <hr />
//                     {grouped[category].map((product) => (
//                         <div
//                             key={product.id}
//                             style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                                 padding: "5px 0",
//                             }}
//                         >
//                             <span>
//                                 {product.name} .......... {product.qty}u (Límite: {product.limit}u)
//                             </span>
//                             <div>
//                                 <button onClick={() => onDecrement(product.id)}>-</button>
//                                 <button onClick={() => onIncrement(product.id)}>+</button>
//                                 <span style={{ marginLeft: "10px" }}>
//                                     {product.qty <= product.limit ? "⚠️ BAJO STOCK" : "⚪ OK"}
//                                 </span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ProductList;


// src/components/ProductList.jsx

import React from "react";

const ProductList = ({ products, onIncrement, onDecrement }) => {
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
                            <div className="product-info">
                                {product.name} .......... {product.qty}u (Límite: {product.limit}u)
                            </div>
                            <div className="product-actions">
                                <button onClick={() => onDecrement(product.id)}>-</button>
                                <button onClick={() => onIncrement(product.id)}>+</button>
                                <span className={product.qty <= product.limit ? "low-stock" : "ok-stock"}>
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
