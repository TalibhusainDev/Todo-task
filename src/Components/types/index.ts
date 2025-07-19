export type TaskStatus = "todo" | "inProgress" | "overdue" | "close";

export interface Task {
  id: string;
  message: string;
  date: string;
  status: TaskStatus;
  createdAt: string;
}

export interface StatusOptions {
  value: string;
  label: string;
}

export interface ValidationErrors {
  task?: string;
  date?: string;
  status?: string;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}
