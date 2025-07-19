/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import type { Task } from "../types";
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
  IconButton,
  Fade,
  MenuItem,
  FormControl,
  Select,
  Divider,
  InputAdornment,
  Stack,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Close,
  Description,
  Flag,
  CalendarToday,
} from "@mui/icons-material";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { statusOptions } from "../utils";
import Status from "./common/Status";

interface EditConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task;
  onConfirm: any;
}

interface ValidationErrors {
  message?: string;
  date?: string;
  status?: string;
}

const EditConfirmationDialog: React.FC<EditConfirmationDialogProps> = ({
  open,
  onClose,
  task,
  onConfirm,
}) => {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEditedTask(task);
    setErrors({}); // Clear errors when task changes
  }, [task]);

  // Validation functions
  const validateTask = (taskValue: string): string | undefined => {
    if (!taskValue?.trim()) {
      return "Task message is required";
    }
    if (taskValue?.trim().length < 3) {
      return "Task message must be at least 3 characters long";
    }
    if (taskValue?.trim().length > 1000) {
      return "Task message must not exceed 1000 characters";
    }
    return undefined;
  };

  const validateDate = (dateValue: string): string | undefined => {
    if (!dateValue) {
      return "Due date is required";
    }
    const dateObj = dayjs(dateValue);
    if (!dateObj.isValid()) {
      return "Please enter a valid date";
    }
    const maxDate = dayjs().add(5, "years");
    if (dateObj.isAfter(maxDate)) {
      return "Due date cannot be more than 5 years in the future";
    }
    return undefined;
  };

  const validateStatus = (statusValue: string): string | undefined => {
    if (!statusValue) {
      return "Status is required";
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      message: validateTask(editedTask?.message),
      date: validateDate(editedTask?.date),
      status: validateStatus(editedTask?.status),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });

    // Clear specific error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleStatusChange = (event: any) => {
    setEditedTask({ ...editedTask, status: event.target.value });

    // Clear status error when user selects a status
    if (errors.status) {
      setErrors({ ...errors, status: undefined });
    }
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    const dateString = newValue ? newValue.format("YYYY-MM-DD") : "";
    setEditedTask({ ...editedTask, date: dateString });

    // Clear date error when user selects a date
    if (errors.date) {
      setErrors({ ...errors, date: undefined });
    }
  };

  const handleSave = async () => {
    try {
      if (validateForm()) {
        setIsSubmitting(true);
        await onConfirm(editedTask);
        onClose();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = !Object.values(errors).some((error) => error);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          overflow: "hidden",
          background: "#fff",
          position: "relative",
          maxHeight: "90vh",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          position: "relative",
          py: 3,
          px: 4,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "#fff",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          <Close />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#fff",
              border: "2px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Edit fontSize="large" />
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="600" sx={{ mb: 0.5 }}>
              Edit Task
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Modify task information
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Message Section */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Description sx={{ color: "#666", fontSize: 20 }} />
              <Typography variant="h6" fontWeight="600" color="text.primary">
                Message
              </Typography>
            </Box>
            <TextField
              fullWidth
              name="message"
              multiline
              rows={4}
              value={editedTask?.message || ""}
              onChange={handleChange}
              placeholder="Enter task description..."
              error={!!errors.message}
              helperText={
                errors.message ||
                `${editedTask?.message?.length || 0}/1000 characters`
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8f9fa",
                  "& fieldset": {
                    borderColor: "#e9ecef",
                  },
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
              }}
            />
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Status Section */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Flag sx={{ color: "#666", fontSize: 20 }} />
              <Typography variant="h6" fontWeight="600" color="text.primary">
                Status
              </Typography>
            </Box>
            <FormControl fullWidth error={!!errors.status}>
              <Select
                value={editedTask?.status || ""}
                onChange={handleStatusChange}
                displayEmpty
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#f8f9fa",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.status ? "#f44336" : "#e9ecef",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.status ? "#f44336" : "#667eea",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.status ? "#f44336" : "#667eea",
                  },
                }}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Stack
                      alignItems={"center"}
                      flexDirection={"row"}
                      gap={2}
                      justifyContent={"start"}
                    >
                      <Status statusValue={option.label} />
                      <Box>{option.label}</Box>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              {errors.status && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 1, ml: 1 }}
                >
                  {errors.status}
                </Typography>
              )}
            </FormControl>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Date Section */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <CalendarToday sx={{ color: "#666", fontSize: 20 }} />
              <Typography variant="h6" fontWeight="600" color="text.primary">
                Date
              </Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date"
                value={editedTask?.date ? dayjs(editedTask.date) : null}
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
                          <CalendarToday
                            sx={{ color: errors.date ? "#f44336" : "#666" }}
                          />
                        </InputAdornment>
                      ),
                    },
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#f8f9fa",
                        transition: "all 0.3s ease",
                        "& fieldset": {
                          borderColor: errors.date ? "#f44336" : "#e9ecef",
                        },
                        "&:hover fieldset": {
                          borderColor: errors.date ? "#f44336" : "#667eea",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: errors.date ? "#f44336" : "#667eea",
                        },
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          p: 3,
          backgroundColor: "#f8f9fa",
          borderTop: "1px solid #e9ecef",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          onClick={onClose}
          startIcon={<Cancel />}
          variant="outlined"
          size="large"
          disabled={isSubmitting}
          sx={{
            minWidth: 120,
            borderColor: "#dee2e6",
            color: "#6c757d",
            fontWeight: "600",
            borderRadius: 2,
            py: 1.5,
            px: 3,
            textTransform: "none",
            "&:hover": {
              borderColor: "#adb5bd",
              backgroundColor: "#f8f9fa",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          startIcon={<Save />}
          variant="contained"
          size="large"
          disabled={isSubmitting || !isFormValid}
          sx={{
            minWidth: 120,
            background:
              isFormValid && !isSubmitting
                ? "linear-gradient(135deg, #28a745 0%, #20c997 100%)"
                : "#dee2e6",
            color: "#fff",
            fontWeight: "600",
            borderRadius: 2,
            py: 1.5,
            px: 3,
            textTransform: "none",
            boxShadow:
              isFormValid && !isSubmitting
                ? "0 4px 12px rgba(40, 167, 69, 0.4)"
                : "none",
            "&:hover": {
              background:
                isFormValid && !isSubmitting
                  ? "linear-gradient(135deg, #218838 0%, #1ea085 100%)"
                  : "#dee2e6",
              boxShadow:
                isFormValid && !isSubmitting
                  ? "0 6px 16px rgba(40, 167, 69, 0.6)"
                  : "none",
              transform:
                isFormValid && !isSubmitting ? "translateY(-1px)" : "none",
            },
            transition: "all 0.3s ease",
          }}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditConfirmationDialog;
