import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import envVars from '../../config/config';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StudentProfile() {
  const { sid } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${envVars.VITE_BASE_URL}/student/${sid}`);
        if (!response.ok) throw new Error('Failed to fetch student data');
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [sid]);

  const getValue = (value) => (value ? value : 'Not available');

  // Data for the bar chart
  const chartData = {
    labels: ['E1 Sem 1', 'E1 Sem 2', 'E2 Sem 1', 'E2 Sem 2'],
    datasets: [
      {
        label: 'Marks',
        data: [
          student?.e1sem1 || 0,
          student?.e1sem2 || 0,
          student?.e2sem1 || 0,
          student?.e2sem2 || 0,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Engineering Semester Marks',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10, // Assuming marks are out of 100
      },
    },
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 font-semibold mt-8">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        {/* Student Profile Header */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 w-full py-6">
  {/* Left Side - Image */}
  <img
    src={student.image}
    alt={student.name}
    className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg object-cover"
  />

  {/* Middle - Text Details */}
  <div className="text-center md:text-left space-y-2">
    <h1 className="text-4xl font-bold text-gray-800">{student.name}</h1>
    <p className="text-xl text-gray-600 font-medium">{getValue(student.branch)}</p>
    <p className="text-lg text-gray-500 font-medium">
      <span className="font-semibold">ID:</span> {getValue(student.sid)}
    </p>
  </div>

  {/* Right Side - Rank Card */}
  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg shadow-lg text-white">
    <h3 className="text-lg font-semibold">Rank</h3>
    <p className="text-3xl font-bold">{getValue(student.rank)}</p>
    <p className="text-sm">in {getValue(student.batch)} Batch</p>
  </div>
</div>



        {/* Grid Layout for All Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Personal Information */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Personal Information
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>ID:</strong> {getValue(student.sid)}
              </p>
              <p>
                <strong>Name:</strong> {getValue(student.name)}
              </p>
              <p>
                <strong>Email:</strong> {getValue(student.email)}
              </p>
              <p>
                <strong>Phone:</strong> {getValue(student.phone)}
              </p>
              <p>
                <strong>Gender:</strong> {getValue(student.gender)}
              </p>
              <p>
                <strong>Date of Birth:</strong> {getValue(student.dob)}
              </p>
              <p>
                <strong>Blood Group:</strong> {getValue(student.bloodGroup)}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Contact Information
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Parent Contact:</strong> {getValue(student.parent)}
              </p>
              <p>
                <strong>Phone 2:</strong> {getValue(student.phone2)}
              </p>
              <p>
                <strong>Address:</strong> {getValue(student.address)}
              </p>
              <p>
                <strong>Mandal:</strong> {getValue(student.mandal)}
              </p>
              <p>
                <strong>District:</strong> {getValue(student.district)}
              </p>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Academic Information
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Batch:</strong> {getValue(student.batch)}
              </p>
              <p>
                <strong>Stream:</strong> {getValue(student.stream)}
              </p>
              <p>
                <strong>Branch:</strong> {getValue(student.branch)}
              </p>
              <p>
                <strong>CGPA:</strong> {getValue(student.cgpa)}
              </p>
              <p>
                <strong>Rank:</strong> {getValue(student.rank)}
              </p>
              <p>
                <strong>CET Hall Ticket No:</strong> {getValue(student.cetHtNo)}
              </p>
              <p>
                <strong>School:</strong> {getValue(student.school)}
              </p>
              <p>
                <strong>SSC:</strong> {getValue(student.ssc)}
              </p>
              <p>
                <strong>SSC Board:</strong> {getValue(student.sscBoard)}
              </p>
              <p>
                <strong>PUC CGPA:</strong> {getValue(student.pucCgpa)}
              </p>
            </div>
          </div>

          {/* Academic Marks */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Academic Marks
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>E1 Sem 1:</strong> {getValue(student.e1sem1)}
              </p>
              <p>
                <strong>E1 Sem 2:</strong> {getValue(student.e1sem2)}
              </p>
              <p>
                <strong>E2 Sem 1:</strong> {getValue(student.e2sem1)}
              </p>
              <p>
                <strong>E2 Sem 2:</strong> {getValue(student.e2sem2)}
              </p>
              <p>
                <strong>Class P1:</strong> {getValue(student.classP1)}
              </p>
              <p>
                <strong>Class P2:</strong> {getValue(student.classP2)}
              </p>
              <p>
                <strong>P1S1:</strong> {getValue(student.p1s1)}
              </p>
              <p>
                <strong>P1S2:</strong> {getValue(student.p1s2)}
              </p>
              <p>
                <strong>P2S1:</strong> {getValue(student.p2s1)}
              </p>
              <p>
                <strong>P2S2:</strong> {getValue(student.p2s2)}
              </p>
            </div>
          </div>

          {/* Family Details */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Family Details
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Father:</strong> {getValue(student.father)}
              </p>
              <p>
                <strong>Mother:</strong> {getValue(student.mother)}
              </p>
            </div>
          </div>

          {/* Engineering Marks Graph */}
          <div className="col-span-1 md:col-span-2 bg-gray-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Engineering Semester Marks
            </h2>
            <div className="w-full h-96">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}