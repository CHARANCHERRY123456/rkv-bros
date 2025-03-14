import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/student/${student.name}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer w-full max-w-md md:max-w-sm lg:max-w-[280px]"
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
