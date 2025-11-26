import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Cargar productos del localStorage
    useEffect(() => {
        const saved = localStorage.getItem("products");
        if (saved) setProducts(JSON.parse(saved));
    }, []);

    // Guardar en localStorage cada vez que cambia products
    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setShowForm(true);
    };

    const handleSaveProduct = (product) => {
        if (selectedProduct) {
            // edición
            setProducts(products.map((p) => (p.id === product.id ? product : p)));
        } else {
            // nuevo producto
            setProducts([...products, { ...product, id: Date.now() }]);
        }
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedProduct(null);
    };

    const handleIncrement = (id) => {
        setProducts(products.map(p => p.id === id ? { ...p, qty: p.qty + 1 } : p));
    };

    const handleDecrement = (id) => {
        setProducts(products.map(p => p.id === id && p.qty > 0 ? { ...p, qty: p.qty - 1 } : p));
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setShowForm(true);
    };

    const handleDeleteProduct = (id) => {
        const confirmed = confirm("¿Seguro que deseas eliminar este producto?");
        if (confirmed) {
            setProducts(products.filter((p) => p.id !== id));
        }
    };


    // Ordenar productos: primero los de bajo stock
    const sortedProducts = [
        ...products.filter(p => p.qty <= p.limit),
        ...products.filter(p => p.qty > p.limit)
    ];

    return (
        <div className="app">
            <Header />
            <div className="actions">
                <button onClick={handleAddProduct}>+ Nuevo producto</button>
            </div>

            {showForm && (
                <ProductForm
                    selectedProduct={selectedProduct}
                    onSave={handleSaveProduct}
                    onCancel={handleCancel}
                />
            )}

            <ProductList
                products={sortedProducts}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
            />

        </div>
    );
}

export default App;
