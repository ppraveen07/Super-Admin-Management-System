import { useQuery } from "@tanstack/react-query";

import { fetchTenants } from "../api/client";

export function useTenants(
  search: string,
  status: string,
  page: number,
  limit: number
) {
  return useQuery({
    queryKey: [
      "tenants",
      search,
      status,
      page,
      limit,
    ],

    queryFn: () =>
      fetchTenants(
        search,
        status,
        page,
        limit
      ),
  });
}