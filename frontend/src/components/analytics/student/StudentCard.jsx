import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/student/${student.name}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:border-gray-500 transition"
    >

      {/* Left: Profile Image */}
      <img
        src={student.image}
        alt={student.name}
        className="w-16 h-16 md:w-14 md:h-14 rounded-full object-cover border"
      />

      {/* Right: Name & Branch */}
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{student.name}</h3>
        <p className="text-gray-500 text-sm">{student.branch}</p>
      </div>
    </div>
  );
};

export default StudentCard;
