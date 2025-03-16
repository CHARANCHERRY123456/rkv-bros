// src/components/StudentResult.jsx
const StudentResult = ({ user }) => (
    <div className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <img
        src={user.image}
        alt={user.name}
        className="w-16 h-16 rounded-full object-cover border border-gray-200"
      />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <p className="text-sm text-gray-600">ID: {user.sid}</p>
        <p className="text-sm text-gray-600">
          Phone: {user.phone} | CGPA: {user.cgpa}
        </p>
      </div>
    </div>
  );
  
  export default StudentResult;