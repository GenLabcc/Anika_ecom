import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import CategoryList from "./components/CategoryList";
import AddCategory from "./components/AddCategory";
import EditCategory from "./components/EditCategory";

export default function App() {
  const [view, setView] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

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
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? { ...c, ...data } : c))
      );
    } else {
      setCategories((prev) => [data, ...prev]);
    }
    setEditingCategory(null);
    setView("categoryList");
  };

  const handleEditCategory = (cat) => {
    setEditingCategory(cat);
    setView("editCategory");
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
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      )}
      {view === "addCategory" && (
        <AddCategory
          onBack={() => setView("categoryList")}
          onPublish={handleCategoryPublish}
        />
      )}
      {view === "editCategory" && (
        <EditCategory
          initialData={editingCategory}
          onBack={() => { setEditingCategory(null); setView("categoryList"); }}
          onPublish={handleCategoryPublish}
        />
      )}

    </div>
  );
}