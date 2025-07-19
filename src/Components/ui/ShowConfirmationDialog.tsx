import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  Fade,
} from "@mui/material";
import {
  Visibility,
  Close,
  CalendarToday,
  Description,
} from "@mui/icons-material";
import type { Task } from "../types";
import { getStatusColor } from "../utils";

interface ShowConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task;
}

const ShowConfirmationDialog: React.FC<ShowConfirmationDialogProps> = ({
  open,
  onClose,
  task,
}) => {
  const [showTask, setShowTask] = useState<Task | null>(task);

  useEffect(() => {
    setShowTask(task);
  }, [task]);

  if (!showTask) return null;

  const statusConfig = getStatusColor(showTask.status);
  const StatusIcon = statusConfig.icon;

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
            <Visibility fontSize="large" />
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="600" sx={{ mb: 0.5 }}>
              Task Details
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Complete task information
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 0 }}>
        {/* Status Section */}
        <Box sx={{ p: 3, borderBottom: "1px solid #f0f0f0" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <StatusIcon sx={{ color: statusConfig.color }} />
            <Typography variant="h6" fontWeight="600" color="text.primary">
              Status
            </Typography>
          </Box>

          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              backgroundColor: statusConfig.bg,
              color: statusConfig.color,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                fontFamily: "monospace",
                opacity: 0.9,
                lineHeight: 1.5,
              }}
            >
              "{showTask.status}"
            </Typography>
          </Box>
        </Box>

        {/* Message Section */}
        <Box sx={{ p: 3, borderBottom: "1px solid #f0f0f0" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Description sx={{ color: "#666" }} />
            <Typography variant="h6" fontWeight="600" color="text.primary">
              Message
            </Typography>
          </Box>
          <Box
            sx={{
              maxHeight: 200,
              overflow: "auto",
              backgroundColor: "#f8f9fa",
              borderRadius: 2,
              p: 2,
              border: "1px solid #e9ecef",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.6,
                color: "#333",
                whiteSpace: "pre-wrap",
              }}
            >
              {showTask.message}
            </Typography>
          </Box>
        </Box>

        {/* Date Section */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <CalendarToday sx={{ color: "#666" }} />
            <Typography variant="h6" fontWeight="600" color="text.primary">
              Date
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              backgroundColor: "#f8f9fa",
              borderRadius: 2,
              p: 2,
              fontFamily: "monospace",
            }}
          >
            {showTask.date}
          </Typography>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          p: 3,
          backgroundColor: "#f8f9fa",
          borderTop: "1px solid #e9ecef",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          size="large"
          sx={{
            minWidth: 140,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            fontWeight: "600",
            borderRadius: 2,
            py: 1.5,
            px: 4,
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
              boxShadow: "0 6px 16px rgba(102, 126, 234, 0.6)",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowConfirmationDialog;
