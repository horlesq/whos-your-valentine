import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreatorPage from "./pages/CreatorPage";
import ValentinePage from "./pages/ValentinePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreatorPage />} />
                <Route path="/v/:id" element={<ValentinePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
