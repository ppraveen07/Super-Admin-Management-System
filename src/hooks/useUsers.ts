import { useQuery } from "@tanstack/react-query";

import {
  fetchUser,
  fetchUsers,
} from "../api/client";

export function useUsers(
  search: string,
  status: string,
  page: number,
  limit: number
) {
  return useQuery({
    queryKey: [
      "users",
      search,
      status,
      page,
      limit,
    ],

    queryFn: () =>
      fetchUsers(
        search,
        status,
        page,
        limit
      ),
  });
}

export function useUser(
  userId: string | null
) {
  return useQuery({
    queryKey: [
      "users",
      "detail",
      userId,
    ],

    queryFn: () =>
      fetchUser(userId!),

    enabled: Boolean(userId),
  });
}