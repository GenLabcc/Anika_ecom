import React, { useState } from "react";
import "./AllOrders.css";

const ALL_ORDERS = [
  { id: "#AJW-1042", customer: "Ranganath",      items: 87, total: "₹5,000", payment: "Paid", status: "Pending",   type: "Regular" },
  { id: "#AJW-1043", customer: "Ranganath",      items: 87, total: "₹5,000", payment: "Paid", status: "Shipped",   type: "Regular" },
  { id: "#AJW-1044", customer: "Ranganath",      items: 87, total: "₹5,000", payment: "Paid", status: "Delivered", type: "Regular" },
  { id: "#AJW-1045", customer: "Ranganath",      items: 87, total: "₹5,000", payment: "Paid", status: "Confirmed", type: "Regular" },
  { id: "#AJW-1046", customer: "Ranganath",      items: 87, total: "₹5,000", payment: "COD",  status: "Return",    type: "Return"  },
  { id: "#AJW-1047", customer: "Meera Nair",     items: 3,  total: "₹2,400", payment: "Paid", status: "Delivered", type: "Regular" },
  { id: "#AJW-1048", customer: "Deepa Krishnan", items: 1,  total: "₹1,200", payment: "Paid", status: "Shipped",   type: "Regular" },
  { id: "#AJW-1049", customer: "Ritu Verma",     items: 5,  total: "₹8,500", payment: "COD",  status: "Pending",   type: "Regular" },
  { id: "#AJW-1050", customer: "Anjali Rao",     items: 2,  total: "₹3,600", payment: "Paid", status: "Confirmed", type: "Regular" },
  { id: "#AJW-1051", customer: "Priya Sharma",   items: 4,  total: "₹6,200", payment: "Paid", status: "Delivered", type: "Regular" },
  { id: "#AJW-1052", customer: "Kavitha Menon",  items: 1,  total: "₹950",   payment: "COD",  status: "Return",    type: "Return"  },
  { id: "#AJW-1053", customer: "Sunita Patel",   items: 6,  total: "₹9,800", payment: "Paid", status: "Shipped",   type: "Regular" },
  { id: "#AJW-1054", customer: "Lakshmi Iyer",   items: 2,  total: "₹4,100", payment: "Paid", status: "Pending",   type: "Regular" },
  { id: "#AJW-1055", customer: "Nandini Reddy",  items: 3,  total: "₹5,600", payment: "Paid", status: "Delivered", type: "Regular" },
  { id: "#AJW-1056", customer: "Bhavana Singh",  items: 1,  total: "₹1,800", payment: "COD",  status: "Confirmed", type: "Regular" },
  { id: "#AJW-1057", customer: "Meera Nair",     items: 2,  total: "₹3,200", payment: "Paid", status: "Shipped",   type: "Regular" },
  { id: "#AJW-1058", customer: "Deepa Krishnan", items: 4,  total: "₹7,400", payment: "Paid", status: "Delivered", type: "Regular" },
  { id: "#AJW-1059", customer: "Ritu Verma",     items: 1,  total: "₹2,100", payment: "COD",  status: "Return",    type: "Return"  },
  { id: "#AJW-1060", customer: "Anjali Rao",     items: 3,  total: "₹4,500", payment: "Paid", status: "Pending",   type: "Regular" },
  { id: "#AJW-1061", customer: "Priya Sharma",   items: 2,  total: "₹3,900", payment: "Paid", status: "Confirmed", type: "Regular" },
  { id: "#AJW-1062", customer: "Kavitha Menon",  items: 5,  total: "₹8,000", payment: "Paid", status: "Shipped",   type: "Regular" },
  { id: "#AJW-1063", customer: "Sunita Patel",   items: 1,  total: "₹1,500", payment: "COD",  status: "Delivered", type: "Regular" },
  { id: "#AJW-1064", customer: "Lakshmi Iyer",   items: 3,  total: "₹5,200", payment: "Paid", status: "Pending",   type: "Regular" },
  { id: "#AJW-1065", customer: "Nandini Reddy",  items: 2,  total: "₹3,000", payment: "Paid", status: "Return",    type: "Return"  },
];

const STATUS_STYLE = {
  Pending:   { bg: "#FFF4E5", color: "#D97706" },
  Shipped:   { bg: "#EFF6FF", color: "#2563EB" },
  Delivered: { bg: "#F0FDF4", color: "#16A34A" },
  Confirmed: { bg: "#F5F3FF", color: "#7C3AED" },
  Return:    { bg: "#FEF2F2", color: "#DC2626" },
};

const PAYMENT_STYLE = {
  Paid: { bg: "#F0FDF4", color: "#16A34A" },
  COD:  { bg: "#FFF4E5", color: "#D97706" },
};

const CATEGORIES = ["All Category", "Necklaces", "Earrings", "Rings", "Bracelets"];
const STATUSES   = ["All Status",   "Pending", "Confirmed", "Shipped", "Delivered", "Return"];
const TYPES      = ["All Types",    "Regular", "Return"];
const PER_PAGE   = 6;

const ChevronDownIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const FilterDropdown = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="ao__dd" tabIndex={0} onBlur={() => setTimeout(() => setOpen(false), 120)}>
      <button className="ao__dd-btn" onClick={() => setOpen((o) => !o)}>
        <span>{value}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <div className="ao__dd-menu">
          {options.map((opt) => (
            <div
              key={opt}
              className={`ao__dd-item${value === opt ? " ao__dd-item--active" : ""}`}
              onMouseDown={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AllOrders = ({ onViewDetail }) => {
  const [category, setCategory] = useState("All Category");
  const [status,   setStatus]   = useState("All Status");
  const [type,     setType]     = useState("All Types");
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState([]);
  const [page,     setPage]     = useState(1);

  const filtered = ALL_ORDERS.filter((o) => {
    const matchStatus = status === "All Status" || o.status === status;
    const matchType   = type   === "All Types"  || o.type   === type;
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchType && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const paginated  = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  // Summary stats (always from full dataset)
  const count = (s) => ALL_ORDERS.filter((o) => o.status === s).length;

  const toggleRow = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const allChecked = paginated.length > 0 && paginated.every((o) => selected.includes(o.id));
  const toggleAll  = () =>
    setSelected(allChecked ? selected.filter((id) => !paginated.find((o) => o.id === id)) : [...new Set([...selected, ...paginated.map((o) => o.id)])]);

  // Smart page number list
  const pageNums = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const p = safePage;
    if (p <= 3)               return [1, 2, 3, "…", totalPages];
    if (p >= totalPages - 2)  return [1, "…", totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", p, "…", totalPages];
  };

  return (
    <div className="ao">

      {/* ── Page header ── */}
      <div className="ao__page-header">
        <div className="ao__page-title-block">
          <h1 className="ao__title">All Orders</h1>
          <p className="ao__subtitle">{filtered.length} Orders</p>
        </div>
        <div className="ao__header-tabs">
          <button className="ao__tab ao__tab--active">All Orders</button>
          <button className="ao__tab">Return Order</button>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="ao__stats">
        <div className="ao__stat">
          <span className="ao__stat-label">All Orders</span>
          <span className="ao__stat-value">{ALL_ORDERS.length.toLocaleString()}</span>
        </div>
        <div className="ao__stat-divider" />
        <div className="ao__stat">
          <span className="ao__stat-label">Pending</span>
          <span className="ao__stat-value">₹4.2L</span>
        </div>
        <div className="ao__stat-divider" />
        <div className="ao__stat">
          <span className="ao__stat-label">Confirmed</span>
          <span className="ao__stat-value">{count("Confirmed")}</span>
        </div>
        <div className="ao__stat-divider" />
        <div className="ao__stat">
          <span className="ao__stat-label">Shipped</span>
          <span className="ao__stat-value">{count("Shipped")}</span>
        </div>
        <div className="ao__stat-divider" />
        <div className="ao__stat">
          <span className="ao__stat-label">Delivered</span>
          <span className="ao__stat-value">{count("Delivered")}</span>
        </div>
        <div className="ao__stat-divider" />
        <div className="ao__stat">
          <span className="ao__stat-label">Returns</span>
          <span className="ao__stat-value">{count("Return")}</span>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="ao__toolbar">
        <FilterDropdown value={category} options={CATEGORIES} onChange={(v) => { setCategory(v); setPage(1); }} />
        <FilterDropdown value={status}   options={STATUSES}   onChange={(v) => { setStatus(v);   setPage(1); }} />
        <FilterDropdown value={type}     options={TYPES}      onChange={(v) => { setType(v);     setPage(1); }} />
        <button className="ao__filter-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          Filter
        </button>
        <div className="ao__search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="ao__search-input"
            placeholder="Search Categories"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="ao__table-wrap">
        <table className="ao__table">
          <thead>
            <tr>
              <th className="ao__th-check">
                <input type="checkbox" className="ao__checkbox" checked={allChecked} onChange={toggleAll} />
              </th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={8} className="ao__empty">No orders found</td></tr>
            ) : (
              paginated.map((order) => {
                const ss = STATUS_STYLE[order.status]   || {};
                const ps = PAYMENT_STYLE[order.payment] || {};
                return (
                  <tr key={order.id} className={`ao__row${selected.includes(order.id) ? " ao__row--selected" : ""}`}>
                    <td className="ao__td-check">
                      <input type="checkbox" className="ao__checkbox" checked={selected.includes(order.id)} onChange={() => toggleRow(order.id)} />
                    </td>
                    <td className="ao__cell-id">{order.id}</td>
                    <td className="ao__cell-customer">{order.customer}</td>
                    <td className="ao__cell-items">{order.items}</td>
                    <td className="ao__cell-total">{order.total}</td>
                    <td>
                      <span className="ao__badge" style={{ background: ps.bg, color: ps.color }}>{order.payment}</span>
                    </td>
                    <td>
                      <span className="ao__badge" style={{ background: ss.bg, color: ss.color }}>{order.status}</span>
                    </td>
                    <td>
                      <button className="ao__view-btn" onClick={() => onViewDetail(order)}>View</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer ── */}
      <div className="ao__footer">
        <span className="ao__showing">
          Showing {filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, filtered.length)} of {filtered.length} categories
        </span>
        <div className="ao__pagination">
          <button className="ao__pg-arrow" disabled={safePage === 1} onClick={() => setPage((p) => p - 1)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          {pageNums().map((n, i) =>
            n === "…" ? (
              <span key={`e${i}`} className="ao__pg-ellipsis">…</span>
            ) : (
              <button
                key={n}
                className={`ao__pg-num${safePage === n ? " ao__pg-num--active" : ""}`}
                onClick={() => setPage(n)}
              >{n}</button>
            )
          )}
          <button className="ao__pg-arrow" disabled={safePage === totalPages} onClick={() => setPage((p) => p + 1)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default AllOrders;