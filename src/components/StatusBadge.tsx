import type { Status } from "../types";

import "./StatusBadge.css";

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={`status-badge ${
        status.toLowerCase()
      }`}
    >
      ● {status}
    </span>
  );
}