import {
  useEffect,
  useState,
} from "react";

import { useTenants } from "../hooks/useTenants";

import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";

import "./Tenants.css";
import "../components/Pagination.css";

export default function Tenants() {

  const [
    searchInput,
    setSearchInput,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState("All");

  const [
    page,
    setPage,
  ] = useState(1);

  const limit = 6;

  useEffect(() => {

    const timer =
      window.setTimeout(() => {

        setSearch(searchInput);

        setPage(1);

      }, 300);

    return () =>
      window.clearTimeout(timer);

  }, [searchInput]);

  const query = useTenants(
    search,
    status,
    page,
    limit
  );

  const tenants =
    query.data?.data ?? [];

  const total =
    query.data?.total ?? 0;

  return (
    <div className="tenants-page">

      <div className="page-heading">

        <div>

          <h1>
            Tenants
          </h1>

          <p>
            Manage organizations
            and their subscriptions
          </p>

        </div>

        <button className="primary-btn">
          + Add Tenant
        </button>

      </div>

      <div className="tenant-summary-grid">

        <div className="tenant-summary-card">

          <div>

            <span>
              Total Tenants
            </span>

            <strong>
              6
            </strong>

            <small>
              All organizations
            </small>

          </div>

          <div className="tenant-icon purple">
            ◈
          </div>

        </div>

        <div className="tenant-summary-card">

          <div>

            <span>
              Active
            </span>

            <strong>
              4
            </strong>

            <small>
              67% of tenants
            </small>

          </div>

          <div className="tenant-icon blue">
            ✓
          </div>

        </div>

        <div className="tenant-summary-card">

          <div>

            <span>
              Inactive
            </span>

            <strong>
              2
            </strong>

            <small>
              33% of tenants
            </small>

          </div>

          <div className="tenant-icon yellow">
            ◷
          </div>

        </div>

        <div className="tenant-summary-card">

          <div>

            <span>
              Suspended
            </span>

            <strong>
              0
            </strong>

            <small>
              No suspended tenants
            </small>

          </div>

          <div className="tenant-icon red">
            !
          </div>

        </div>

      </div>

      <div className="tenants-card">

        <div className="tenants-toolbar">

          <div className="tenant-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search tenants..."
              value={searchInput}
              onChange={(event) =>
                setSearchInput(
                  event.target.value
                )
              }
            />

          </div>

          <select
            value={status}
            onChange={(event) => {

              setStatus(
                event.target.value
              );

              setPage(1);

            }}
          >

            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

            <option value="Suspended">
              Suspended
            </option>

          </select>

        </div>

        {query.isLoading && (

          <div className="tenant-state">
            Loading tenants...
          </div>

        )}

        {query.isError && (

          <div className="tenant-state error">
            Failed to load tenants.
          </div>

        )}

        {!query.isLoading &&
          !query.isError && (

          <>

            <div className="tenant-table-wrapper">

              <table className="tenants-table">

                <thead>

                  <tr>

                    <th>
                      Tenant
                    </th>

                    <th>
                      Plan
                    </th>

                    <th>
                      Users
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Created
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {tenants.length === 0 ? (

                    <tr>

                      <td
                        colSpan={6}
                        className="empty-row"
                      >
                        No tenants found
                      </td>

                    </tr>

                  ) : (

                    tenants.map(
                      (tenant) => (

                        <tr
                          key={tenant.id}
                        >

                          <td>

                            <div className="tenant-cell">

                              <div className="tenant-avatar">
                                {tenant.name.charAt(
                                  0
                                )}
                              </div>

                              <div>

                                <strong>
                                  {tenant.name}
                                </strong>

                                <span>
                                  {tenant.id}
                                  {" · "}
                                  {tenant.email}
                                </span>

                              </div>

                            </div>

                          </td>

                          <td>

                            <span
                              className={`plan-badge ${
                                tenant.plan.toLowerCase()
                              }`}
                            >
                              {tenant.plan}
                            </span>

                          </td>

                          <td>

                            <span className="users-count">
                              {tenant.users}
                            </span>

                          </td>

                          <td>

                            <StatusBadge
                              status={
                                tenant.status
                              }
                            />

                          </td>

                          <td>
                            {tenant.created}
                          </td>

                          <td>

                            <button className="tenant-action-btn">
                              View
                            </button>

                          </td>

                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

            <div className="tenant-table-footer">

              <span>
                Showing{" "}
                {tenants.length} of{" "}
                {total} tenants
              </span>

              <Pagination
                page={page}
                totalPages={Math.max(
                  1,
                  Math.ceil(
                    total / limit
                  )
                )}
                onPageChange={
                  setPage
                }
              />

            </div>

          </>

        )}

      </div>

    </div>
  );
}