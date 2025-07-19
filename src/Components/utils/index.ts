import { CheckCircle, Schedule, Error, Info } from "@mui/icons-material";
import type { StatusOptions } from "../types";

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return {
        color: "#4caf50",
        bg: "rgba(76, 175, 80, 0.1)",
        icon: CheckCircle,
      };
    case "pending":
      return {
        color: "#ff9800",
        bg: "rgba(255, 152, 0, 0.1)",
        icon: Schedule,
      };
    case "in progress":
      return { color: "#2196f3", bg: "rgba(33, 150, 243, 0.1)", icon: Info };
    default:
      return { color: "#f44336", bg: "rgba(244, 67, 54, 0.1)", icon: Error };
  }
};

export const statusOptions: StatusOptions[] = [
  { value: "pending", label: "Pending" },
  { value: "in progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export const gradients: string[] = [
  "linear-gradient(135deg, #2b2e4a, #e84545)", // indigo navy to bright red
  "linear-gradient(135deg, #1b1b1b, #f7971e)", // deep black to warm orange
  "linear-gradient(135deg, #1f1c2c, #928dab)", // deep purple to muted violet
  "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", // dark teal blend
  "linear-gradient(135deg, #232526, #414345)", // charcoal to slate
  "linear-gradient(135deg, #141e30, #243b55)", // night blue gradient
  "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", // deep purple trio
  "linear-gradient(135deg, #232526, #ff4e50)", // charcoal to fiery coral
  "linear-gradient(135deg, #1d2b64, #f8cdda)", // midnight blue to peach pink
  "linear-gradient(135deg, #141e30, #457fca)", // black navy to royal blue
  "linear-gradient(135deg, #1c1c1c, #f00000)", // black to blood red
  "linear-gradient(135deg, #2c3e50, #4ca1af)", // ocean depth
  "linear-gradient(135deg, #000428, #004e92)", // midnight blue to deep blue
  "linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)", // vibrant & deep sunset
  "linear-gradient(135deg, #42275a, #734b6d)", // twilight purple shades
  "linear-gradient(135deg, #111111, #00c6ff)", // dark obsidian to bright cyan
  "linear-gradient(135deg, #1f4037, #99f2c8)", // dark green to mint green
  "linear-gradient(135deg, #3e5151, #decba4)", // steel gray to pale gold
  "linear-gradient(135deg, #2C3E50, #FD746C)", // dark steel to soft red
  "linear-gradient(135deg, #000000, #434343)", // solid black to gray – simple but effective
];
