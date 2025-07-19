import {
  Flag as FlagIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";

interface StatusProps {
  statusValue: string;
}

const Status: React.FC<StatusProps> = ({ statusValue }) => {
  const getStatusIcon = (statusValue: string) => {
    switch (statusValue.toLocaleLowerCase()) {
      case "completed":
        return <CheckCircleIcon sx={{ color: "#4caf50" }} />;
      case "in progress":
        return <FlagIcon sx={{ color: "#ff9800" }} />;
      case "cancelled":
        return <DoDisturbAltIcon sx={{ color: "#db4a1eff" }} />;
      default:
        return <FlagIcon sx={{ color: "#9e9e9e" }} />;
    }
  };
  return getStatusIcon(statusValue);
};

export default Status;
