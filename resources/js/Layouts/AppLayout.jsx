import React from "react";
import Navbar from "../Components/Navbar";

const AppLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
};

export default AppLayout;