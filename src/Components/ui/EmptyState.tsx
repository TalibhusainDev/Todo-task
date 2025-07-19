import React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";
import { Assignment } from "@mui/icons-material";

const gradients = [
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(135deg, #f093fb, #f5576c)",
];

interface EmptyStateProps {
  hasFilters: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "500px",
        textAlign: "center",
        p: 4,
      }}
    >
      <Avatar
        sx={{
          width: 140,
          height: 140,
          mb: 4,
          background: gradients[0],
          border: "4px solid #fff",
          boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
        }}
      >
        <Assignment sx={{ fontSize: 70, color: "#fff" }} />
      </Avatar>

      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: 300,
          color: "#495057",
          letterSpacing: "0.5px",
        }}
      >
        {hasFilters ? "No Matching Tasks" : "No Tasks Yet"}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "#6c757d",
          maxWidth: 450,
          lineHeight: 1.6,
        }}
      >
        {hasFilters
          ? "Try adjusting your search or filter criteria to find your tasks."
          : "Your task list is empty. Start by adding your first task to get organized and boost your productivity!"}
      </Typography>

      <Paper
        elevation={6}
        sx={{
          p: 4,
          background: gradients[1],
          borderRadius: 4,
          maxWidth: 550,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -50,
            right: -50,
            width: 100,
            height: 100,
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontStyle: "italic",
            mb: 2,
            opacity: 0.95,
            fontWeight: 400,
          }}
        >
          "The secret of getting ahead is getting started."
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            opacity: 0.9,
            fontSize: "0.9rem",
          }}
        >
          — Mark Twain
        </Typography>
      </Paper>
    </Box>
  );
};

export default EmptyState;
