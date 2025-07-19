import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import { Delete, Edit, CalendarToday } from "@mui/icons-material";
import type { Task } from "../types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { gradients } from "../utils";
import Status from "./common/Status";

interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onShow: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  onDelete,
  onEdit,
  onShow,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dateString: string) => {
    const taskDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return taskDate < today && task.status.toLowerCase() !== "completed";
  };

  return (
    <Paper
      elevation={isHovered ? 12 : 6}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        p: 3,
        borderRadius: 4,
        background: gradients[index % gradients.length],
        color: "#fff",
        height: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transform: isHovered
          ? "translateY(-12px) scale(1.02)"
          : "translateY(0) scale(1)",
        boxShadow: isHovered
          ? "0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)"
          : "0 8px 24px rgba(0,0,0,0.15)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255,255,255,0.1)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: -50,
          right: -50,
          width: 100,
          height: 100,
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          transform: isHovered ? "scale(1)" : "scale(0)",
          transition: "transform 0.4s ease",
        },
      }}
    >
      {/* Header with Task Number and Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
          zIndex: 1,
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "2px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
        >
          {index + 1}
        </Avatar>

        <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Edit Task" arrow>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task.id);
                }}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(244, 67, 54, 0.8)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="See Task" arrow>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onShow(task.id);
                }}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(244, 67, 54, 0.8)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Task" arrow>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(244, 67, 54, 0.8)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
        </Box>
      </Box>

      {/* Task Content */}
      <Box sx={{ flex: 1, zIndex: 1 }}>
        <Typography
          variant="h6"
          fontWeight="600"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "serif",
            mb: 2,
            lineHeight: 1.4,
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          {task.message}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            opacity: 0.9,
          }}
        >
          <CalendarToday sx={{ fontSize: 16 }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              fontFamily: "serif",
              color: isOverdue(task.date) ? "#ffcdd2" : "#fff",
            }}
          >
            {formatDate(task.date)}
            {isOverdue(task.date) && " (Overdue)"}
          </Typography>
        </Box>
      </Box>

      {/* Footer with Status */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{
              fontWeight: 700,
              opacity: 0.9,
              fontFamily: "serif",
            }}
          >
            Status :
          </Typography>
        </Box>

        <Chip
          label={task.status}
          avatar={<Status statusValue={task.status} />}
          sx={{
            backgroundColor: "rgba(255,255,255,0.25)",
            color: "#fff",
            p: 1,
            fontWeight: "bold",
            fontSize: "0.75rem",
            border: "1px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.35)",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default TaskCard;
