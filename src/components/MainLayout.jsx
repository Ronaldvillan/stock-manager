// src/components/MainLayout.jsx

import Header from "./Header";
import React from "react";

const MainLayout = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                background: "#f2f4f7",
            }}
        >
            <Header />
            <div
                style={{
                    flex: 1,
                    padding: "20px",
                    overflowY: "auto",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
