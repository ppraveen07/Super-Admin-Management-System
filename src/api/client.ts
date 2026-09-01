import type {
    DummyUser,
  DummyUsersResponse,
  Tenant,
  User,
} from "../types";

const API_BASE_URL = "https://dummyjson.com";

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchUsers(
  search = "",
  status = "All",
  page = 1,
  limit = 10
): Promise<{ data: User[]; total: number }> {
  const skip = (page - 1) * limit;

  const endpoint = search.trim()
    ? `${API_BASE_URL}/users/search?q=${encodeURIComponent(
        search
      )}&limit=${limit}&skip=${skip}`
    : `${API_BASE_URL}/users?limit=${limit}&skip=${skip}`;

  const result = await request<DummyUsersResponse>(endpoint);

  const data: User[] = result.users.map((item, index) => ({
    id: String(item.id),
    name: `${item.firstName} ${item.lastName}`,
    email: item.email,
    role:
      index === 0
        ? "Admin"
        : index < 3
        ? "Manager"
        : "User",
    tenant: [
      "Acme Corporation",
      "Tech Solutions",
      "Global Limited",
    ][index % 3],
    status:
      index === 2 || index === 5
        ? "Inactive"
        : "Active",
    image: item.image,
  }));

  const filtered =
    status === "All"
      ? data
      : data.filter(
          (user) => user.status === status
        );

  return {
    data: filtered,
    total: result.total,
  };
}

export async function fetchUser(
  userId: string
): Promise<User> {
  const item = await request<DummyUser>(
    `${API_BASE_URL}/users/${userId}`
  );

  return {
    id: String(item.id),
    name: `${item.firstName} ${item.lastName}`,
    email: item.email,
    role: "User",
    tenant: "Acme Corporation",
    status: "Active",
    image: item.image,
  };
}

const tenants: Tenant[] = [
  {
    id: "TEN-001",
    name: "Acme Corporation",
    email: "admin@acme.com",
    plan: "Premium",
    users: 25,
    status: "Active",
    created: "12 Aug 2026",
  },
  {
    id: "TEN-002",
    name: "Tech Solutions",
    email: "admin@techsolutions.com",
    plan: "Basic",
    users: 12,
    status: "Active",
    created: "08 Aug 2026",
  },
  {
    id: "TEN-003",
    name: "Global Limited",
    email: "admin@global.com",
    plan: "Free",
    users: 8,
    status: "Inactive",
    created: "01 Aug 2026",
  },
  {
    id: "TEN-004",
    name: "Digital Works",
    email: "admin@digitalworks.com",
    plan: "Premium",
    users: 18,
    status: "Active",
    created: "28 Jul 2026",
  },
  {
    id: "TEN-005",
    name: "Startup Hub",
    email: "admin@startuphub.com",
    plan: "Free",
    users: 5,
    status: "Active",
    created: "22 Jul 2026",
  },
  {
    id: "TEN-006",
    name: "Enterprise Group",
    email: "admin@enterprise.com",
    plan: "Enterprise",
    users: 42,
    status: "Inactive",
    created: "15 Jul 2026",
  },
];

export async function fetchTenants(
  search = "",
  status = "All",
  page = 1,
  limit = 10
): Promise<{ data: Tenant[]; total: number }> {
  await new Promise((resolve) =>
    setTimeout(resolve, 250)
  );

  const filtered = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      tenant.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      tenant.id
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" ||
      tenant.status === status;

    return matchesSearch && matchesStatus;
  });

  const start = (page - 1) * limit;

  return {
    data: filtered.slice(
      start,
      start + limit
    ),
    total: filtered.length,
  };
}