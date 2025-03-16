import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const CardItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  cursor: "pointer",
  transition: "0.3s",
  borderRadius: theme.spacing(1.5),
  "&:hover": {
    boxShadow: theme.shadows[4],
    transform: "scale(1.02)",
  },
}));

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <CardItem onClick={() => navigate(`/student/${student.sid}`)}>
        <Avatar
          src={student.image}
          alt={student.name}
          sx={{ width: 56, height: 56 }}
        />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {student.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {student.branch}
          </Typography>
        </Box>
      </CardItem>
    </Grid>
  );
};

export default function StudentList({ students }) {
  return (
    <Box sx={{ flexGrow: 1, p: 3, maxWidth: "1400px", mx: "auto" }}>
      <Grid container spacing={3}>
      {students.map((student, index) => (
        <StudentCard key={student.id || index} student={student} />
      ))}
      </Grid>
    </Box>
  );
}
