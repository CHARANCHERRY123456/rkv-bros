import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const CardItem = styled(Paper)(({ theme }) => ({
  background: "#fff",
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  cursor: "pointer",
  transition: "transform 0.3s, box-shadow 0.3s",
  borderRadius: theme.spacing(1.5),
  boxShadow: theme.shadows[1],
  "&:hover": {
    boxShadow: theme.shadows[4],
    transform: "scale(1.02)",
  },
}));

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  return (
    <CardItem onClick={() => navigate(`/student/${student.sid}`)}>
      {/* Avatar on the left */}
      <Avatar
        src={student.image}
        alt={student.name}
        sx={{ width: 56, height: 56 }}
      />
      {/* Details on the right */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        {/* Name at the top in bold with wrapping enabled */}
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            fontWeight: "bold", 
            whiteSpace: "normal", 
            overflowWrap: "break-word", 
            wordBreak: "break-word" 
          }}
        >
          {student.name}
        </Typography>
        {/* Bottom row with ID (left) and branch (right) */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {student.sid}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {student.branch}
          </Typography>
        </Box>
      </Box>
    </CardItem>
  );
};

export default function StudentList({ students }) {
  return (
    <Box
      sx={{
        maxWidth: "1400px",
        mx: "auto",
        p: 3,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 3,
      }}
    >
      {students.map((student, index) => (
        <StudentCard key={student.sid || index} student={student} />
      ))}
    </Box>
  );
}
