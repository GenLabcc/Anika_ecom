import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import CategoryList from "./components/CategoryList";
import AddCategory from "./components/AddCategory";

export default function App() {
  const [view, setView] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // ── Product handlers ──────────────────────────────────────
  const handlePublish = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setView("list");
  };

  const handleSaveDraft = (draftProduct) => {
    setProducts((prev) => [draftProduct, ...prev]);
    setView("list");
  };

  // ── Category handlers ─────────────────────────────────────
  const handleCategoryPublish = (data) => {
    setCategories((prev) => [data, ...prev]);
    setView("categoryList");
  };

  const handleDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="App">

      {view === "dashboard" && (
        <Dashboard
          onGoToProducts={() => setView("list")}
          onGoToCategories={() => setView("categoryList")}
        />
      )}

      {/* ── Products ── */}
      {view === "list" && (
        <ProductList
          products={products}
          onAddProduct={() => setView("add")}
          onBack={() => setView("dashboard")}
        />
      )}
      {view === "add" && (
        <AddProduct
          onBack={() => setView("list")}
          onPublish={handlePublish}
          onSaveDraft={handleSaveDraft}
        />
      )}

      {/* ── Categories ── */}
      {view === "categoryList" && (
        <CategoryList
          categories={categories}
          setCategories={setCategories}
          onAddCategory={() => setView("addCategory")}
          onDeleteCategory={handleDeleteCategory}
        />
      )}
      {view === "addCategory" && (
        <AddCategory
          onBack={() => setView("categoryList")}
          onPublish={handleCategoryPublish}
        />
      )}

    </div>
  );
}
