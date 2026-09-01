import {
  useEffect,
  useState,
} from "react";

import { useUsers } from "../hooks/useUsers";

import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";

import "./Users.css";
import "../components/Pagination.css";

export default function Users() {

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

  const limit = 10;

  useEffect(() => {

    const timer =
      window.setTimeout(() => {

        setSearch(searchInput);

        setPage(1);

      }, 300);

    return () =>
      window.clearTimeout(timer);

  }, [searchInput]);

  const query = useUsers(
    search,
    status,
    page,
    limit
  );

  const users =
    query.data?.data ?? [];

  const total =
    query.data?.total ?? 0;

  return (
    <div className="users-page">

      <div className="page-heading">

        <div>

          <h1>
            Users
          </h1>

          <p>
            Manage users across
            all tenants
          </p>

        </div>

        <button className="primary-btn">
          + Add User
        </button>

      </div>

      <div className="user-summary-grid">

        <div className="summary-card">

          <span>
            Total Users
          </span>

          <strong>
            {total}
          </strong>

          <small>
            All registered users
          </small>

        </div>

        <div className="summary-card active-summary">

          <span>
            Active
          </span>

          <strong>
            7
          </strong>

          <small>
            70% of total users
          </small>

        </div>

        <div className="summary-card inactive-summary">

          <span>
            Inactive
          </span>

          <strong>
            3
          </strong>

          <small>
            30% of total users
          </small>

        </div>

        <div className="summary-card suspended-summary">

          <span>
            Suspended
          </span>

          <strong>
            0
          </strong>

          <small>
            No suspended users
          </small>

        </div>

      </div>

      <div className="users-card">

        <div className="users-toolbar">

          <div className="search-box">

            <span>
              ⌕
            </span>

            <input
              value={searchInput}
              onChange={(event) =>
                setSearchInput(
                  event.target.value
                )
              }
              placeholder="Search users..."
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

          <div className="table-state">
            Loading users...
          </div>

        )}

        {query.isError && (

          <div className="table-state error">
            Failed to load users.
          </div>

        )}

        {!query.isLoading &&
          !query.isError && (

          <>

            <div className="table-wrapper">

              <table className="users-table">

                <thead>

                  <tr>

                    <th>
                      User
                    </th>

                    <th>
                      Role
                    </th>

                    <th>
                      Tenant
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {users.length === 0 ? (

                    <tr>

                      <td
                        colSpan={5}
                        className="empty-row"
                      >
                        No users found
                      </td>

                    </tr>

                  ) : (

                    users.map(
                      (user) => (

                        <tr
                          key={user.id}
                        >

                          <td>

                            <div className="user-cell">

                              <div className="user-avatar">
                                {user.name.charAt(
                                  0
                                )}
                              </div>

                              <div>

                                <strong>
                                  {user.name}
                                </strong>

                                <span>
                                  {user.email}
                                </span>

                              </div>

                            </div>

                          </td>

                          <td>

                            <span className="role-badge">
                              {user.role}
                            </span>

                          </td>

                          <td>
                            {user.tenant}
                          </td>

                          <td>

                            <StatusBadge
                              status={
                                user.status
                              }
                            />

                          </td>

                          <td>

                            <button className="action-btn">
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

            <div className="table-footer">

              <span>
                Showing{" "}
                {users.length} of{" "}
                {total} users
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