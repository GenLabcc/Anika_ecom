import React, { useState } from "react";
import "./Allcustomers.css";

const mockCustomers = [
  { id: 1,  name: "Ranganath", email: "priya.s@gmail.com", phone: "+91 98400 11111", orders: 87, totalSpent: 5000, joined: "12th May,2026", status: "Confirmed" },
  { id: 2,  name: "Ranganath", email: "priya.s@gmail.com", phone: "+91 98400 11111", orders: 87, totalSpent: 5000, joined: "12th May,2026", status: "Confirmed" },
  { id: 3,  name: "Ranganath", email: "priya.s@gmail.com", phone: "+91 98400 11111", orders: 87, totalSpent: 5000, joined: "12th May,2026", status: "Disabled" },
  { id: 4,  name: "Ranganath", email: "priya.s@gmail.com", phone: "+91 98400 11111", orders: 87, totalSpent: 5000, joined: "12th May,2026", status: "Confirmed" },
  { id: 5,  name: "Ranganath", email: "priya.s@gmail.com", phone: "+91 98400 11111", orders: 87, totalSpent: 5000, joined: "12th May,2026", status: "Disabled" },
  { id: 6,  name: "Meera Nair", email: "meera.n@gmail.com", phone: "+91 98400 22222", orders: 42, totalSpent: 6600, joined: "10th May,2026", status: "Confirmed" },
  { id: 7,  name: "Deepa Krishnan", email: "deepa.k@gmail.com", phone: "+91 98400 33333", orders: 35, totalSpent: 5707, joined: "8th May,2026", status: "Confirmed" },
  { id: 8,  name: "Ritu Verma", email: "ritu.v@gmail.com", phone: "+91 98400 44444", orders: 28, totalSpent: 4680, joined: "5th May,2026", status: "Disabled" },
  { id: 9,  name: "Anjali Rao", email: "anjali.r@gmail.com", phone: "+91 98400 55555", orders: 19, totalSpent: 3600, joined: "3rd May,2026", status: "Confirmed" },
  { id: 10, name: "Kavitha S", email: "kavitha.s@gmail.com", phone: "+91 98400 66666", orders: 12, totalSpent: 2100, joined: "1st May,2026", status: "Confirmed" },
];

const ROWS_PER_PAGE = 6;

const ChevronDown = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const AllCustomers = ({ onViewDetail }) => {
  const [selectedIds, setSelectedIds]     = useState([]);
  const [statusFilter, setStatusFilter]   = useState("All Status");
  const [typeFilter, setTypeFilter]       = useState("All Customers");
  const [searchQuery, setSearchQuery]     = useState("");
  const [currentPage, setCurrentPage]     = useState(1);

  // ── Filtering ──────────────────────────────────────────────────────
  const filtered = mockCustomers.filter((c) => {
    const matchStatus =
      statusFilter === "All Status" ||
      c.status === statusFilter;
    const matchSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  const totalPages  = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated   = filtered.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  // ── Select logic ───────────────────────────────────────────────────
  const allChecked  = paginated.length > 0 && paginated.every((c) => selectedIds.includes(c.id));
  const toggleAll   = () => setSelectedIds(allChecked ? selectedIds.filter((id) => !paginated.find((c) => c.id === id)) : [...new Set([...selectedIds, ...paginated.map((c) => c.id)])]);
  const toggleOne   = (id) => setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  // ── Stats ──────────────────────────────────────────────────────────
  const totalCustomers   = mockCustomers.length;
  const newThisMonth     = 21;
  const activeAccounts   = mockCustomers.filter((c) => c.status === "Confirmed").length;
  const disabledAccounts = mockCustomers.filter((c) => c.status === "Disabled").length;
  const avgOrderValue    = Math.round(mockCustomers.reduce((s, c) => s + c.totalSpent, 0) / totalCustomers);

  // ── Pagination helper ──────────────────────────────────────────────
  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage, "...", totalPages];
  };

  return (
    <div className="ac">
      {/* ── Header ── */}
      <div className="ac__header">
        <div className="ac__header-left">
          <h1 className="ac__title">All Customers</h1>
          <span className="ac__subtitle">{filtered.length} customers</span>
        </div>
        <div className="ac__header-actions">
          <button className="ac__link-btn">All Orders</button>
          <button className="ac__link-btn">Return Order</button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="ac__stats-row">
        <div className="ac__stat-card">
          <div className="ac__stat-label">Total Customers</div>
          <div className="ac__stat-value">{totalCustomers}</div>
          <div className="ac__stat-sub">All Time</div>
        </div>
        <div className="ac__stat-card">
          <div className="ac__stat-label">New this month</div>
          <div className="ac__stat-value">{newThisMonth}</div>
          <div className="ac__stat-sub">May 2026</div>
        </div>
        <div className="ac__stat-card">
          <div className="ac__stat-label">Active Accounts</div>
          <div className="ac__stat-value">{activeAccounts}</div>
          <div className="ac__stat-sub">Enabled</div>
        </div>
        <div className="ac__stat-card">
          <div className="ac__stat-label">Disabled Accounts</div>
          <div className="ac__stat-value">{disabledAccounts}</div>
          <div className="ac__stat-sub">Restricted</div>
        </div>
        <div className="ac__stat-card">
          <div className="ac__stat-label">Avg. order value</div>
          <div className="ac__stat-value">₹{avgOrderValue.toLocaleString("en-IN")}</div>
          <div className="ac__stat-sub">Per customer</div>
        </div>
      </div>

      {/* ── Filters + Search ── */}
      <div className="ac__toolbar">
        <div className="ac__filters">
          <div className="ac__select-wrapper">
            <select
              className="ac__select"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option>All Status</option>
              <option>Confirmed</option>
              <option>Disabled</option>
            </select>
            <ChevronDown />
          </div>

          <div className="ac__select-wrapper">
            <select
              className="ac__select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>All Customers</option>
              <option>New Customers</option>
              <option>Returning</option>
            </select>
            <ChevronDown />
          </div>

          <div className="ac__select-wrapper">
            <select className="ac__select">
              <option>Filter</option>
              <option>By Amount</option>
              <option>By Orders</option>
            </select>
            <ChevronDown />
          </div>
        </div>

        <div className="ac__search-wrapper">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="ac__search-input"
            placeholder="Search name, email, contact...."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="ac__table-wrapper">
        <table className="ac__table">
          <thead>
            <tr>
              <th className="ac__th ac__th--check">
                <input type="checkbox" className="ac__checkbox" checked={allChecked} onChange={toggleAll} />
              </th>
              <th className="ac__th">Customer</th>
              <th className="ac__th">Contact</th>
              <th className="ac__th ac__th--center">Orders</th>
              <th className="ac__th ac__th--center">Total spent</th>
              <th className="ac__th ac__th--center">Joined</th>
              <th className="ac__th ac__th--center">Status</th>
              <th className="ac__th ac__th--center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((customer) => (
              <tr key={customer.id} className="ac__tr">
                <td className="ac__td ac__td--check">
                  <input
                    type="checkbox"
                    className="ac__checkbox"
                    checked={selectedIds.includes(customer.id)}
                    onChange={() => toggleOne(customer.id)}
                  />
                </td>
                <td className="ac__td ac__td--name">{customer.name}</td>
                <td className="ac__td ac__td--contact">
                  <span>{customer.email}</span>
                  <span>{customer.phone}</span>
                </td>
                <td className="ac__td ac__td--center">{customer.orders}</td>
                <td className="ac__td ac__td--center">₹{customer.totalSpent.toLocaleString("en-IN")}</td>
                <td className="ac__td ac__td--center">{customer.joined}</td>
                <td className="ac__td ac__td--center">
                  <span className={`ac__badge ac__badge--${customer.status === "Confirmed" ? "confirmed" : "disabled"}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="ac__td ac__td--center">
                  <button
                    className="ac__view-btn"
                    onClick={() => onViewDetail && onViewDetail(customer)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Footer ── */}
      <div className="ac__footer">
        <span className="ac__showing">
          Showing {(currentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} of {filtered.length} Customers
        </span>
        <div className="ac__pagination">
          <button
            className="ac__page-btn ac__page-btn--arrow"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ‹
          </button>
          {getPageNumbers().map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="ac__page-ellipsis">…</span>
            ) : (
              <button
                key={p}
                className={`ac__page-btn${currentPage === p ? " ac__page-btn--active" : ""}`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            )
          )}
          <button
            className="ac__page-btn ac__page-btn--arrow"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCustomers;