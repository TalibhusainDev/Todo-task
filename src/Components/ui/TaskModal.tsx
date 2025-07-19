import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  Avatar,
} from "@mui/material";
import { Edit, Visibility, Save, Cancel } from "@mui/icons-material";
import type { Task } from "../types";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  mode: "view" | "edit";
  onSave?: (updatedTask: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  task,
  mode,
  onSave,
}) => {
  const [editedTask, setEditedTask] = useState<Task | null>(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!editedTask) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSave = () => {
    if (onSave && editedTask) onSave(editedTask);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
          background: "linear-gradient(135deg, #4facfe, #00f2fe)",
          color: "#fff",
          boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <DialogTitle sx={{ textAlign: "center", pt: 4, pb: 2 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              mx: "auto",
              mb: 2,
              border: "3px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {mode === "edit" ? (
              <Edit fontSize="large" />
            ) : (
              <Visibility fontSize="large" />
            )}
          </Avatar>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(45deg, #00c6ff, #0072ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 1,
            }}
          >
            {mode === "edit" ? "Edit Task" : "Task Details"}
          </Typography>

          {mode === "view" && (
            <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 500 }}>
              View full information of the task
            </Typography>
          )}
        </DialogTitle>

        <DialogContent dividers sx={{ px: 4 }}>
          {mode === "edit" ? (
            <>
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={editedTask.message}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ sx: { color: "#fff" } }}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "#fff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Status"
                name="status"
                value={editedTask.status}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ sx: { color: "#fff" } }}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "#fff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={editedTask.date}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true, sx: { color: "#fff" } }}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "#fff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                  },
                }}
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle2" gutterBottom>
                Message:
              </Typography>
              <Typography paragraph sx={{ opacity: 0.9 }}>
                {editedTask.message}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Status:
              </Typography>
              <Typography paragraph>{editedTask.status}</Typography>

              <Typography variant="subtitle2" gutterBottom>
                Date:
              </Typography>
              <Typography paragraph>{editedTask.date}</Typography>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", gap: 2, px: 4, pb: 4 }}>
          <Button
            onClick={onClose}
            startIcon={<Cancel />}
            variant="outlined"
            sx={{
              minWidth: 120,
              borderColor: "rgba(255,255,255,0.3)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 3,
              py: 1.5,
              px: 3,
              "&:hover": {
                borderColor: "rgba(255,255,255,0.5)",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Close
          </Button>

          {mode === "edit" && (
            <Button
              onClick={handleSave}
              startIcon={<Save />}
              variant="contained"
              sx={{
                minWidth: 120,
                background: "linear-gradient(45deg, #00c853, #64dd17)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: 3,
                py: 1.5,
                px: 3,
                boxShadow: "0 6px 20px rgba(0, 200, 83, 0.4)",
                "&:hover": {
                  background: "linear-gradient(45deg, #43a047, #388e3c)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 200, 83, 0.5)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TaskModal;
