import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { Warning, Delete, Cancel } from "@mui/icons-material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskMessage: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  taskMessage,
}) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
          background: "linear-gradient(135deg, #667eea, #764ba2)",
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
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            pb: 2,
            pt: 4,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              backgroundColor: "rgba(244, 67, 54, 0.2)",
              color: "#ff5722",
              mx: "auto",
              mb: 2,
              border: "3px solid rgba(244, 67, 54, 0.3)",
            }}
          >
            <Warning sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(45deg, #ff5722, #ff9800)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 1,
            }}
          >
            Delete Task
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontWeight: 500,
            }}
          >
            This action cannot be undone
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", px: 4 }}>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            Are you sure you want to delete this task?
          </Typography>

          <Box
            sx={{
              p: 3,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                opacity: 0.9,
                lineHeight: 1.5,
              }}
            >
              "{taskMessage}"
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            gap: 2,
            px: 4,
            pb: 4,
          }}
        >
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
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            startIcon={<Delete />}
            variant="contained"
            sx={{
              minWidth: 120,
              background: "linear-gradient(45deg, #f44336, #e91e63)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 3,
              py: 1.5,
              px: 3,
              boxShadow: "0 6px 20px rgba(244, 67, 54, 0.4)",
              "&:hover": {
                background: "linear-gradient(45deg, #d32f2f, #c2185b)",
                boxShadow: "0 8px 25px rgba(244, 67, 54, 0.5)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
