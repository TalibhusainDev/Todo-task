/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Alert,
  Snackbar,
  Box,
  InputAdornment,
  Zoom,
  Fade,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  Add as AddIcon,
  Task as TaskIcon,
  CalendarToday as CalendarIcon,
  Flag as FlagIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";
import Status from "./common/Status";
import { statusOptions } from "../utils";
import type { SnackbarState, ValidationErrors } from "../types";

interface Props {
  setTasks: any;
}


const Form: React.FC<Props> = ({ setTasks }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  // Validation functions
  const validateTask = (taskValue: string): string | undefined => {
    if (!taskValue.trim()) {
      return "Task message is required";
    }
    if (taskValue.trim().length < 3) {
      return "Task message must be at least 3 characters long";
    }
    if (taskValue.trim().length > 1000) {
      return "Task message must not exceed 1000 characters";
    }
    return undefined;
  };

  const validateDate = (dateValue: Dayjs | null): string | undefined => {
    if (!dateValue) {
      return "Due date is required";
    }
    if (!dateValue.isValid()) {
      return "Please enter a valid date";
    }
    const today = dayjs().startOf("day");
    if (dateValue.isBefore(today)) {
      return "Due date cannot be in the past";
    }
    const maxDate = dayjs().add(5, "years");
    if (dateValue.isAfter(maxDate)) {
      return "Due date cannot be more than 5 years in the future";
    }
    return undefined;
  };

  const validateStatus = (statusValue: string): string | undefined => {
    if (!statusValue) {
      return "Status is required";
    }

    const isValid = statusOptions.some((item) => item.value === statusValue);
    if (!isValid) {
      return "Please select a valid status";
    }

    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      task: validateTask(task),
      date: validateDate(date),
      status: validateStatus(status),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const showSnackbar = (
    message: string,
    severity: SnackbarState["severity"]
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showSnackbar("Please fix the errors before submitting", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newTask = {
        id: Date.now().toString(),
        message: task.trim(),
        date: date!.format("YYYY-MM-DD"),
        status,
        createdAt: dayjs().toISOString(),
      };

      const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = [...existingTasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      // Reset form
      setTask("");
      setDate(null);
      setStatus("");
      setErrors({});

      showSnackbar("Task added successfully!", "success");
    } catch (error) {
      console.error("Error adding task:", error);
      showSnackbar("Failed to add task. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTaskChange = (value: string) => {
    setTask(value);
    if (errors.task) {
      setErrors((prev) => ({ ...prev, task: validateTask(value) }));
    }
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: validateDate(newValue) }));
    }
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    if (errors.status) {
      setErrors((prev) => ({ ...prev, status: validateStatus(value) }));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Fade in timeout={800}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
            border: "1px solid rgba(0,0,0,0.05)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background:
                "linear-gradient(90deg, #ff416c, #ff4b2b, #667eea, #764ba2)",
              backgroundSize: "300% 100%",
              animation: "gradient 3s ease infinite",
            },
            "@keyframes gradient": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <TaskIcon sx={{ fontSize: 32, color: "#667eea", mr: 2 }} />
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Add New Task
            </Typography>
          </Box>

          <Grid container spacing={3} alignItems="flex-start">
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                maxRows={4}
                label="Task Message"
                required
                variant="outlined"
                value={task}
                onChange={(e) => handleTaskChange(e.target.value)}
                error={!!errors.task}
                helperText={errors.task || `${task.length}/1000 characters`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TaskIcon
                        sx={{ color: errors.task ? "#f44336" : "#666" }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.25)",
                    },
                    "&.Mui-error": {
                      boxShadow: "0 6px 20px rgba(244, 67, 54, 0.25)",
                    },
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  value={date}
                  onChange={handleDateChange}
                  minDate={dayjs()}
                  maxDate={dayjs().add(5, "years")}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      variant: "outlined",
                      error: !!errors.date,
                      helperText: errors.date,
                      InputProps: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon
                              sx={{ color: errors.date ? "#f44336" : "#666" }}
                            />
                          </InputAdornment>
                        ),
                      },
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          },
                          "&.Mui-focused": {
                            boxShadow: "0 6px 20px rgba(102, 126, 234, 0.25)",
                          },
                          "&.Mui-error": {
                            boxShadow: "0 6px 20px rgba(244, 67, 54, 0.25)",
                          },
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                select
                fullWidth
                variant="outlined"
                label="Status"
                required
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                error={!!errors.status}
                helperText={errors.status}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {status ? (
                        <Status statusValue={status} />
                      ) : (
                        <FlagIcon
                          sx={{ color: errors.status ? "#f44336" : "#666" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.25)",
                    },
                    "&.Mui-error": {
                      boxShadow: "0 6px 20px rgba(244, 67, 54, 0.25)",
                    },
                  },
                }}
              >
                {statusOptions.map((s) => (
                  <MenuItem
                    key={s.label}
                    value={s.value}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Stack
                      alignItems={"center"}
                      flexDirection={"row"}
                      gap={2}
                      justifyContent={"start"}
                    >
                      <Box>{s.label}</Box>
                    </Stack>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <Zoom in timeout={600}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? undefined : <AddIcon />}
                  sx={{
                    height: "56px",
                    background: isSubmitting
                      ? "linear-gradient(45deg, #bdbdbd, #9e9e9e)"
                      : "linear-gradient(45deg, #ff416c, #ff4b2b)",
                    color: "#fff",
                    borderRadius: 2,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: "0 6px 20px rgba(255, 65, 108, 0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: isSubmitting
                        ? "linear-gradient(45deg, #bdbdbd, #9e9e9e)"
                        : "linear-gradient(45deg, #e91e63, #f44336)",
                      transform: isSubmitting ? "none" : "translateY(-2px)",
                      boxShadow: isSubmitting
                        ? "0 6px 20px rgba(189, 189, 189, 0.4)"
                        : "0 8px 25px rgba(255, 65, 108, 0.5)",
                    },
                    "&:disabled": {
                      color: "#fff",
                    },
                  }}
                >
                  {isSubmitting ? "Adding..." : "Add Task"}
                </Button>
              </Zoom>
            </Grid>
          </Grid>

          {/* Error Summary */}
          {Object.values(errors).some((error) => error) && (
            <Fade in timeout={300}>
              <Alert
                severity="error"
                icon={<ErrorIcon />}
                sx={{
                  mt: 3,
                  borderRadius: 2,
                  "& .MuiAlert-message": {
                    fontSize: "0.95rem",
                  },
                }}
              >
                <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                  Please fix the following errors:
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {Object.entries(errors).map(
                    ([field, error]) =>
                      error && (
                        <li key={field} style={{ marginBottom: "4px" }}>
                          <Typography variant="body2">{error}</Typography>
                        </li>
                      )
                  )}
                </Box>
              </Alert>
            </Fade>
          )}
        </Paper>
      </Fade>

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
    </>
  );
};

export default Form;
