export type Page = "dashboard" | "users" | "tenants";

export type Status = "Active" | "Inactive" | "Suspended";

export type Role = "Admin" | "Manager" | "User";

export type Plan = "Free" | "Basic" | "Premium" | "Enterprise";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  tenant: string;
  status: Status;
  image?: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  users: number;
  status: Status;
  created: string;
}

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  email: string;
  image: string;
  role?: string;
}

export interface DummyUsersResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}