import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import envVars from '../../config/config';

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

  const getValue = (value) => value ? value : 'Not available';

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><div className="text-center text-red-500">{error}</div></div>;
  if (!student) return <div className="flex justify-center items-center h-screen"><div className="text-center text-gray-500">No student data available</div></div>;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 px-4">
      <div className="relative py-3 max-w-5xl mx-auto w-full">
        <div className="relative px-6 py-10 bg-white shadow-lg rounded-3xl p-8">
          <div className="max-w-3xl mx-auto w-full">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {student.image && (
                  <img src={student.image} alt={student.name} className="w-32 h-32 rounded-full object-cover" />
                )}
                <h1 className="text-3xl font-semibold text-gray-800">{student.name}</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
              <div className="space-y-6 w-full">
                <div className="border rounded-lg p-6 w-full">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border p-2"><strong>ID:</strong></div> <div className="border p-2">{getValue(student.sid)}</div>
                    <div className="border p-2"><strong>Name:</strong></div> <div className="border p-2">{getValue(student.name)}</div>
                    <div className="border p-2"><strong>Email:</strong></div> <div className="border p-2">{getValue(student.email)}</div>
                    <div className="border p-2"><strong>Phone:</strong></div> <div className="border p-2">{getValue(student.phone)}</div>
                    <div className="border p-2"><strong>Gender:</strong></div> <div className="border p-2">{getValue(student.gender)}</div>
                    <div className="border p-2"><strong>Date of Birth:</strong></div> <div className="border p-2">{getValue(student.dob)}</div>
                    <div className="border p-2"><strong>Blood Group:</strong></div> <div className="border p-2">{getValue(student.bloodGroup)}</div>
                  </div>
                </div>

                <div className="border rounded-lg p-6 w-full">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border p-2"><strong>Parent Contact:</strong></div> <div className="border p-2">{getValue(student.parent)}</div>
                    <div className="border p-2"><strong>Phone 2:</strong></div> <div className="border p-2">{getValue(student.phone2)}</div>
                    <div className="border p-2"><strong>Address:</strong></div> <div className="border p-2">{getValue(student.address)}</div>
                    <div className="border p-2"><strong>Mandal:</strong></div> <div className="border p-2">{getValue(student.mandal)}</div>
                    <div className="border p-2"><strong>District:</strong></div> <div className="border p-2">{getValue(student.district)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 w-full">
                <div className="border rounded-lg p-6 w-full">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Academic Information</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border p-2"><strong>Batch:</strong></div> <div className="border p-2">{getValue(student.batch)}</div>
                    <div className="border p-2"><strong>Stream:</strong></div> <div className="border p-2">{getValue(student.stream)}</div>
                    <div className="border p-2"><strong>Branch:</strong></div> <div className="border p-2">{getValue(student.branch)}</div>
                    <div className="border p-2"><strong>CGPA:</strong></div> <div className="border p-2">{getValue(student.cgpa)}</div>
                    <div className="border p-2"><strong>Rank:</strong></div> <div className="border p-2">{getValue(student.rank)}</div>
                    <div className="border p-2"><strong>CET Hall Ticket No:</strong></div> <div className="border p-2">{getValue(student.cetHtNo)}</div>
                    <div className="border p-2"><strong>School:</strong></div> <div className="border p-2">{getValue(student.school)}</div>
                    <div className="border p-2"><strong>SSC:</strong></div> <div className="border p-2">{getValue(student.ssc)}</div>
                    <div className="border p-2"><strong>SSC Board:</strong></div> <div className="border p-2">{getValue(student.sscBoard)}</div>
                    <div className="border p-2"><strong>PUC CGPA:</strong></div> <div className="border p-2">{getValue(student.pucCgpa)}</div>
                    <div className="border p-2"><strong>E1 Sem 1:</strong></div> <div className="border p-2">{getValue(student.e1sem1)}</div>
                    <div className="border p-2"><strong>E1 Sem 2:</strong></div> <div className="border p-2">{getValue(student.e1sem2)}</div>
                    <div className="border p-2"><strong>E2 Sem 1:</strong></div> <div className="border p-2">{getValue(student.e2sem1)}</div>
                    <div className="border p-2"><strong>E2 Sem 2:</strong></div> <div className="border p-2">{getValue(student.e2sem2)}</div>
                    <div className="border p-2"><strong>Class P1:</strong></div> <div className="border p-2">{getValue(student.classP1)}</div>
                    <div className="border p-2"><strong>Class P2:</strong></div> <div className="border p-2">{getValue(student.classP2)}</div>
                    <div className="border p-2"><strong>P1S1:</strong></div> <div className="border p-2">{getValue(student.p1s1)}</div>
                    <div className="border p-2"><strong>P1S2:</strong></div> <div className="border p-2">{getValue(student.p1s2)}</div>
                    <div className="border p-2"><strong>P2S1:</strong></div> <div className="border p-2">{getValue(student.p2s1)}</div>
                    <div className="border p-2"><strong>P2S2:</strong></div> <div className="border p-2">{getValue(student.p2s2)}</div>
                  </div>
                </div>

                <div className="border rounded-lg p-6 w-full">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Family Details</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border p-2"><strong>Father:</strong></div> <div className="border p-2">{getValue(student.father)}</div>
                    <div className="border p-2"><strong>Mother:</strong></div> <div className="border p-2">{getValue(student.mother)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}