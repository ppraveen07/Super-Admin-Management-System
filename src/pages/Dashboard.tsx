import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  fetchTenants,
  fetchUsers,
} from "../api/client";

import "./Dashboard.css";

interface DashboardProps {
  onNavigate: (
    page: "users" | "tenants"
  ) => void;
}

export default function Dashboard({
  onNavigate,
}: DashboardProps) {

  const usersQuery = useQuery({
    queryKey: [
      "dashboard",
      "users",
    ],

    queryFn: () =>
      fetchUsers(
        "",
        "All",
        1,
        100
      ),

    staleTime: 30_000,
  });

  const tenantsQuery = useQuery({
    queryKey: [
      "dashboard",
      "tenants",
    ],

    queryFn: () =>
      fetchTenants(
        "",
        "All",
        1,
        100
      ),

    staleTime: 30_000,
  });

  const users =
    usersQuery.data?.data ?? [];

  const tenants =
    tenantsQuery.data?.data ?? [];

  const activeUsers =
    users.filter(
      (user) =>
        user.status === "Active"
    ).length;

  const inactiveUsers =
    users.filter(
      (user) =>
        user.status === "Inactive"
    ).length;

  const activeTenants =
    tenants.filter(
      (tenant) =>
        tenant.status === "Active"
    ).length;

  const inactiveTenants =
    tenants.filter(
      (tenant) =>
        tenant.status === "Inactive"
    ).length;

  const adminCount =
    users.filter(
      (user) =>
        user.role === "Admin"
    ).length;

  const managerCount =
    users.filter(
      (user) =>
        user.role === "Manager"
    ).length;

  const normalUserCount =
    users.filter(
      (user) =>
        user.role === "User"
    ).length;

  const planCounts = useMemo(
    () => ({
      Free: tenants.filter(
        (tenant) =>
          tenant.plan === "Free"
      ).length,

      Basic: tenants.filter(
        (tenant) =>
          tenant.plan === "Basic"
      ).length,

      Premium: tenants.filter(
        (tenant) =>
          tenant.plan === "Premium"
      ).length,

      Enterprise: tenants.filter(
        (tenant) =>
          tenant.plan === "Enterprise"
      ).length,
    }),
    [tenants]
  );

  const loading =
    usersQuery.isLoading ||
    tenantsQuery.isLoading;

  const error =
    usersQuery.error ||
    tenantsQuery.error;

  if (loading) {
    return (
      <div className="page-state">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-state error-state">

        Unable to load dashboard
        data.

        <button
          onClick={() => {
            usersQuery.refetch();
            tenantsQuery.refetch();
          }}
        >
          Try again
        </button>

      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <h1>
            Super Admin Dashboard
          </h1>

          <p>
            Overview of users,
            tenants and system
            activity
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={() => {
            usersQuery.refetch();
            tenantsQuery.refetch();
          }}
        >
          ↻ &nbsp; Refresh
        </button>

      </div>

      {/* TOP STAT CARDS */}

      <div className="stat-grid">

        <div className="dashboard-stat-card">

          <div>
            <span className="stat-label">
              Total Users
            </span>

            <strong>
              {users.length}
            </strong>

            <small className="stat-growth">
              +12.5%
            </small>
          </div>

          <div className="stat-icon purple-icon">
            ♙
          </div>

        </div>

        <div className="dashboard-stat-card">

          <div>
            <span className="stat-label">
              Active Users
            </span>

            <strong>
              {activeUsers}
            </strong>
          </div>

          <div className="stat-icon blue-icon">
            ♙
          </div>

        </div>

        <div className="dashboard-stat-card">

          <div>
            <span className="stat-label">
              Total Tenants
            </span>

            <strong>
              {tenants.length}
            </strong>

            <small className="stat-growth">
              +8.3%
            </small>
          </div>

          <div className="stat-icon violet-icon">
            ♙
          </div>

        </div>

        <div className="dashboard-stat-card">

          <div>
            <span className="stat-label">
              Revenue
            </span>

            <strong>
              $299.9
            </strong>

            <small className="stat-growth">
              +15.2%
            </small>
          </div>

          <div className="stat-icon orange-icon">
            ♙
          </div>

        </div>

      </div>

      {/* STATISTICS */}

      <div className="statistics-grid">

        {/* USER STATISTICS */}

        <div className="statistics-card">

          <div className="statistics-title">

            <h2>
              User Statistics
            </h2>

            <span>
              Updated: Today
            </span>

          </div>

          <div className="mini-stat-grid">

            <div className="mini-stat purple-bg">

              <strong>
                {users.length}
              </strong>

              <label>
                Total Users
              </label>

              <small>
                ↑ 12.5%
              </small>

            </div>

            <div className="mini-stat purple-bg">

              <strong>
                {activeUsers}
              </strong>

              <label>
                Active
              </label>

              <small>
                ●{" "}
                {users.length
                  ? Math.round(
                      (activeUsers /
                        users.length) *
                        100
                    )
                  : 0}
                %
              </small>

            </div>

            <div className="mini-stat yellow-bg">

              <strong>
                {inactiveUsers}
              </strong>

              <label>
                Inactive
              </label>

              <small>
                ●{" "}
                {users.length
                  ? Math.round(
                      (inactiveUsers /
                        users.length) *
                        100
                    )
                  : 0}
                %
              </small>

            </div>

            <div className="mini-stat red-bg">

              <strong>0</strong>

              <label>
                Suspended
              </label>

              <small>
                ● 0%
              </small>

            </div>

          </div>

          <div className="distribution">

            <h3>
              Role Distribution
            </h3>

            <div className="chips">

              <span className="chip purple-chip">
                admin: {adminCount}
              </span>

              <span className="chip blue-chip">
                manager: {managerCount}
              </span>

              <span className="chip gray-chip">
                user: {normalUserCount}
              </span>

            </div>

          </div>

          <button
            className="view-btn"
            onClick={() =>
              onNavigate("users")
            }
          >
            View Users →
          </button>

        </div>

        {/* TENANT STATISTICS */}

        <div className="statistics-card">

          <div className="statistics-title">

            <h2>
              Tenant Statistics
            </h2>

            <span>
              Updated: Today
            </span>

          </div>

          <div className="mini-stat-grid">

            <div className="mini-stat purple-bg">

              <strong>
                {tenants.length}
              </strong>

              <label>
                Total Tenants
              </label>

            </div>

            <div className="mini-stat purple-bg">

              <strong>
                {activeTenants}
              </strong>

              <label>
                Active
              </label>

              <small>
                ●{" "}
                {tenants.length
                  ? Math.round(
                      (activeTenants /
                        tenants.length) *
                        100
                    )
                  : 0}
                %
              </small>

            </div>

            <div className="mini-stat yellow-bg">

              <strong>
                {inactiveTenants}
              </strong>

              <label>
                Inactive
              </label>

              <small>
                ●{" "}
                {tenants.length
                  ? Math.round(
                      (inactiveTenants /
                        tenants.length) *
                        100
                    )
                  : 0}
                %
              </small>

            </div>

            <div className="mini-stat red-bg">

              <strong>0</strong>

              <label>
                Suspended
              </label>

              <small>
                ● 0%
              </small>

            </div>

          </div>

          <div className="distribution">

            <h3>
              Plan Distribution
            </h3>

            <div className="chips">

              <span className="chip gray-chip">
                free: {planCounts.Free}
              </span>

              <span className="chip purple-chip">
                basic: {planCounts.Basic}
              </span>

              <span className="chip blue-chip">
                premium: {planCounts.Premium}
              </span>

              <span className="chip violet-chip">
                enterprise:{" "}
                {planCounts.Enterprise}
              </span>

            </div>

          </div>

          <button
            className="view-btn"
            onClick={() =>
              onNavigate("tenants")
            }
          >
            View Tenants →
          </button>

        </div>

      </div>

      {/* RECENT ACTIVITY */}

      <div className="activity-card">

        <div className="activity-header">

          <div>

            <h2>
              Recent Activity
            </h2>

            <p>
              Latest actions across
              your system
            </p>

          </div>

          <span className="activity-count">
            10 Activities
          </span>

        </div>

        <div className="activity-list">

          <div className="activity-item">

            <div className="activity-avatar purple-avatar">
              U
            </div>

            <div>

              <strong>
                New user registered
              </strong>

              <p>
                New user activity
                detected
              </p>

            </div>

            <time>
              2 min ago
            </time>

          </div>

          <div className="activity-item">

            <div className="activity-avatar blue-avatar">
              T
            </div>

            <div>

              <strong>
                Tenant activated
              </strong>

              <p>
                Tenant status was
                updated
              </p>

            </div>

            <time>
              15 min ago
            </time>

          </div>

          <div className="activity-item">

            <div className="activity-avatar yellow-avatar">
              U
            </div>

            <div>

              <strong>
                User status changed
              </strong>

              <p>
                A user profile was
                updated
              </p>

            </div>

            <time>
              1 hour ago
            </time>

          </div>

        </div>

      </div>

    </div>
  );
}