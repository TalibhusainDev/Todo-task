import React, { useState, useMemo } from "react";
import { Alert, Box, Grid, Snackbar } from "@mui/material";
import TaskCard from "./TaskCard";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import SearchAndFilter from "./SearchAndFilter";
import EmptyState from "./EmptyState";
import type { SnackbarState, Task } from "../types";
import EditConfirmationDialog from "./EditConfirmationDialog";
import ShowConfirmationDialog from "./ShowConfirmationDialog";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks = [], setTasks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState<
    "delete" | "edit" | "show" | null
  >(null);
  const [selectedCard, setSelectedCard] = useState<Task | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const filteredTasks = useMemo(() => {
    return tasks?.filter((task) => {
      const matchesSearch = task.message
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || task.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, statusFilter]);

  const handleDeleteClick = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedCard(task);
      setDialogOpen("delete");
    }
  };

  const handleEditClick = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedCard(task);
      setDialogOpen("edit");
    }
  };

  const handleShowClick = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedCard(task);
      setDialogOpen("show");
    }
  };

  const handleDeleteConfirm = () => {
    try {
      if (selectedCard) {
        const updatedTasks = tasks.filter(
          (task) => task.id !== selectedCard.id
        );
        setTasks(updatedTasks);

        // Update localStorage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        setDialogOpen(null);
        setSelectedCard(null);
      }
      showSnackbar("Task deleted successfully!", "success");
    } catch (error) {
      console.error("Error adding task:", error);
      showSnackbar("Failed to delete task. Please try again.", "error");
    }
  };

  const handleEditConfirm = (task: Task) => {
    try {
      if (selectedCard) {
        const updatedTasks = tasks.map((item) =>
          item.id === task.id ? task : item
        );

        setTasks(updatedTasks);

        // Update localStorage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        setDialogOpen(null);
        setSelectedCard(null);
      }
      showSnackbar("Task updated successfully!", "success");
    } catch (error) {
      console.error("Error adding task:", error);
      showSnackbar("Failed to update task. Please try again.", "error");
    }
  };

  const handleDialogeCancel = () => {
    setDialogOpen(null);
    setSelectedCard(null);
  };

  const showSnackbar = (
    message: string,
    severity: SnackbarState["severity"]
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  const hasFilters = searchTerm !== "" || statusFilter !== "all";

  return (
    <Box sx={{ mt: 4 }}>
      <SearchAndFilter
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
      />

      {filteredTasks.length === 0 ? (
        <EmptyState hasFilters={hasFilters} />
      ) : (
        <Grid container spacing={4}>
          {filteredTasks.map((task, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={task.id}>
              <TaskCard
                task={task}
                index={index}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
                onShow={handleShowClick}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <DeleteConfirmationDialog
        open={dialogOpen === "delete"}
        onClose={handleDialogeCancel}
        onConfirm={handleDeleteConfirm}
        taskMessage={selectedCard?.message || ""}
      />

      <EditConfirmationDialog
        onClose={handleDialogeCancel}
        onConfirm={handleEditConfirm}
        open={dialogOpen === "edit"}
        task={selectedCard!}
      />

      <ShowConfirmationDialog
        onClose={handleDialogeCancel}
        open={dialogOpen === "show"}
        task={selectedCard!}
      />

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskList;
