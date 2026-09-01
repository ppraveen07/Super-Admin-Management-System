import type { ReactNode } from "react";

import type { Page } from "../types";

import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Layout({
  children,
  currentPage,
  onNavigate,
}: LayoutProps) {
  return (
    <div className="app-layout">

      <header className="top-header">

        <div className="header-inner">

          <div className="brand">
            Stakly Super Admin
          </div>

          <nav className="navigation">

            {(
              [
                "dashboard",
                "users",
                "tenants",
              ] as Page[]
            ).map((page) => (

              <button
                key={page}
                className={`nav-link ${
                  currentPage === page
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  onNavigate(page)
                }
              >
                {page
                  .charAt(0)
                  .toUpperCase() +
                  page.slice(1)}
              </button>

            ))}

          </nav>

        </div>

      </header>

      <main className="main-content">
        {children}
      </main>

    </div>
  );
}