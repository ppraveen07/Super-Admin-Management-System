import { useState } from "react";
import "./App.css";

type Page = "dashboard" | "users" | "tenants";

function App() {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">S</div>
          <span>Stakly</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={page === "dashboard" ? "nav-item active" : "nav-item"}
            onClick={() => setPage("dashboard")}
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            className={page === "tenants" ? "nav-item active" : "nav-item"}
            onClick={() => setPage("tenants")}
          >
            <span>▣</span>
            Tenants
          </button>

          <button
            className={page === "users" ? "nav-item active" : "nav-item"}
            onClick={() => setPage("users")}
          >
            <span>♙</span>
            Users
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <span>⚙</span>
            Settings
          </button>

          <button className="nav-item">
            <span>?</span>
            Help
          </button>

          <div className="profile">
            <div className="avatar">PA</div>
            <div>
              <strong>Praveen Admin</strong>
              <small>Super Admin</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <header className="header">
          <div>
            <h1>
              {page === "dashboard"
                ? "Dashboard"
                : page === "users"
                ? "Users"
                : "Tenants"}
            </h1>

            <p>
              {page === "dashboard"
                ? "Overview of your platform"
                : page === "users"
                ? "Manage all platform users"
                : "Manage all platform tenants"}
            </p>
          </div>

          <div className="header-right">
            <button className="notification">♢</button>
            <div className="header-avatar">PA</div>
          </div>
        </header>

        {page === "dashboard" && <Dashboard />}
        {page === "users" && <Users />}
        {page === "tenants" && <Tenants />}
      </main>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */

function Dashboard() {
  return (
    <section className="content">
      <div className="cards">
        <div className="stat-card">
          <div className="stat-top">
            <span>Total Tenants</span>
            <div className="stat-icon purple">▣</div>
          </div>
          <strong>24</strong>
          <small>+12% from last month</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Total Users</span>
            <div className="stat-icon blue">♙</div>
          </div>
          <strong>1,248</strong>
          <small>+8% from last month</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Active Tenants</span>
            <div className="stat-icon green">✓</div>
          </div>
          <strong>21</strong>
          <small>87.5% of total tenants</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Inactive Tenants</span>
            <div className="stat-icon orange">!</div>
          </div>
          <strong>3</strong>
          <small>12.5% of total tenants</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Recent Tenants</h2>
              <p>Recently added tenants</p>
            </div>

            <button className="view-button">View all</button>
          </div>

          <div className="table">
            <div className="table-row table-head">
              <span>Tenant</span>
              <span>Status</span>
              <span>Users</span>
              <span>Created</span>
            </div>

            <TenantRow
              name="Acme Corporation"
              email="admin@acme.com"
              status="Active"
              users="124"
              date="Aug 28, 2026"
            />

            <TenantRow
              name="Tech Solutions"
              email="admin@techsolutions.com"
              status="Active"
              users="89"
              date="Aug 26, 2026"
            />

            <TenantRow
              name="Global Industries"
              email="admin@global.com"
              status="Active"
              users="67"
              date="Aug 24, 2026"
            />

            <TenantRow
              name="StartUp Labs"
              email="admin@startuplabs.com"
              status="Inactive"
              users="42"
              date="Aug 21, 2026"
            />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Quick Actions</h2>
              <p>Common administration tasks</p>
            </div>
          </div>

          <div className="quick-actions">
            <button>
              <span className="action-icon purple">+</span>
              <div>
                <strong>Add Tenant</strong>
                <small>Create a new tenant</small>
              </div>
            </button>

            <button>
              <span className="action-icon blue">♙</span>
              <div>
                <strong>Add User</strong>
                <small>Create a new user</small>
              </div>
            </button>

            <button>
              <span className="action-icon green">▣</span>
              <div>
                <strong>Manage Tenants</strong>
                <small>View and manage tenants</small>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- USERS ---------------- */

function Users() {
  const users = [
    ["John Smith", "john@example.com", "Acme Corporation", "Active"],
    ["Sarah Johnson", "sarah@example.com", "Tech Solutions", "Active"],
    ["Michael Brown", "michael@example.com", "Global Industries", "Inactive"],
    ["Emily Davis", "emily@example.com", "Acme Corporation", "Active"],
    ["David Wilson", "david@example.com", "StartUp Labs", "Active"],
  ];

  return (
    <section className="content">
      <div className="page-toolbar">
        <div className="search-box">
          <span>⌕</span>
          <input placeholder="Search users..." />
        </div>

        <button className="primary-button">+ Add User</button>
      </div>

      <div className="panel full-panel">
        <div className="panel-header">
          <div>
            <h2>All Users</h2>
            <p>Manage users across all tenants</p>
          </div>

          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="table users-table">
          <div className="table-row table-head">
            <span>User</span>
            <span>Tenant</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {users.map((user) => (
            <div className="table-row" key={user[1]}>
              <div className="user-cell">
                <div className="mini-avatar">
                  {user[0]
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </div>

                <div>
                  <strong>{user[0]}</strong>
                  <small>{user[1]}</small>
                </div>
              </div>

              <span>{user[2]}</span>

              <span>
                <Status status={user[3]} />
              </span>

              <button className="more">•••</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TENANTS ---------------- */

function Tenants() {
  const tenants = [
    ["Acme Corporation", "admin@acme.com", "124", "Active"],
    ["Tech Solutions", "admin@techsolutions.com", "89", "Active"],
    ["Global Industries", "admin@global.com", "67", "Active"],
    ["StartUp Labs", "admin@startuplabs.com", "42", "Inactive"],
    ["Digital Works", "admin@digitalworks.com", "35", "Active"],
  ];

  return (
    <section className="content">
      <div className="page-toolbar">
        <div className="search-box">
          <span>⌕</span>
          <input placeholder="Search tenants..." />
        </div>

        <button className="primary-button">+ Add Tenant</button>
      </div>

      <div className="panel full-panel">
        <div className="panel-header">
          <div>
            <h2>All Tenants</h2>
            <p>Manage organizations on the platform</p>
          </div>

          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="table">
          <div className="table-row table-head">
            <span>Tenant</span>
            <span>Users</span>
            <span>Status</span>
            <span>Created</span>
          </div>

          {tenants.map((tenant) => (
            <div className="table-row" key={tenant[0]}>
              <div className="user-cell">
                <div className="tenant-icon">▣</div>
                <div>
                  <strong>{tenant[0]}</strong>
                  <small>{tenant[1]}</small>
                </div>
              </div>

              <span>{tenant[2]}</span>

              <span>
                <Status status={tenant[3]} />
              </span>

              <span>Aug 2026</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMPONENTS ---------------- */

function TenantRow({
  name,
  email,
  status,
  users,
  date,
}: {
  name: string;
  email: string;
  status: string;
  users: string;
  date: string;
}) {
  return (
    <div className="table-row">
      <div className="user-cell">
        <div className="tenant-icon">▣</div>

        <div>
          <strong>{name}</strong>
          <small>{email}</small>
        </div>
      </div>

      <Status status={status} />

      <span>{users}</span>

      <span>{date}</span>
    </div>
  );
}

function Status({ status }: { status: string }) {
  return (
    <span
      className={
        status === "Active"
          ? "status active-status"
          : "status inactive-status"
      }
    >
      ● {status}
    </span>
  );
}

export default App;