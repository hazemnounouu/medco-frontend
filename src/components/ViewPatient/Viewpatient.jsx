import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

export default function Viewpatient() {
  const [patients, setPatients] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const { userLogin } = useContext(UserContext);

  if (!userLogin) {
    return null;
  }

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/user/list', {
        headers: {
          'atoken': userLogin
        }
      })
      .then((res) => {
        console.log(res.data.data)
        setPatients(res.data.data);
        setAllPatients(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching patients:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchEmail.trim() === '') {
      setPatients(allPatients);
    } else {
      const filtered = allPatients.filter(pat =>
        (pat.email || '').toLowerCase().includes(searchEmail.toLowerCase())
      );
      setPatients(filtered);
    }
  }, [searchEmail, allPatients]);

  function handleDelete(id) {
    axios
      .delete('http://localhost:4000/api/admin/delete-patient', {
        headers: {
          'atoken': userLogin,
          'Content-Type': 'application/json',
        },
        data: { "patientId": id },
      })
      .then(() => {
        setDeleteTarget(null);
        axios.get('http://localhost:4000/api/user/list', {
          headers: {
            'atoken': userLogin
          }
        })
          .then((res) => {
            setPatients(res.data.data);
            setAllPatients(res.data.data);
          });
      })
      .catch((err) => {
        console.error('Error deleting patient:', err);
      });
  }

  return (
    <div className="pl-64 bg-gray-50 min-h-screen py-10 px-6">
      <h2 className="text-2xl font-semibold mx-96 px-30 pb-5 text-[#5CAFE1] mb-6">
        Patients List
      </h2>

      {/* Search by email */}
      <div className="max-w-md mb-6 pb-2">
        <label className="block text-sm font-medium text-[#5CAFE1] mb-1">Search by Patient Email</label>
        <input
          type="text"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="Type patient email..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[#5CAFE1] focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-start">
          {patients.length === 0 ? (
            <p className="text-[#5CAFE1] text-lg">No patient matches the current email search.</p>
          ) : (
            patients.map((patient, index) => (
              <div
                key={patient._id || index}
                className="relative w-72 bg-white rounded-2xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out overflow-hidden border border-gray-200"
              >
                <button
                  onClick={() => setDeleteTarget({ id: patient._id, name: patient.name })}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer transition duration-200 ease-in-out"
                  title="Delete Patient"
                >
                  <strong>X</strong>
                </button>

                <img
                  src={patient.image}
                  alt={patient.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-xs font-bold text-[#5CAFE1] uppercase mb-1">Name:</p>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">{patient.name}</h2>

                  <p className="text-xs font-bold text-[#5CAFE1] uppercase mb-1">ID:</p>
                  <p className="text-sm text-gray-700 mb-2">{patient._id}</p>

                  <p className="text-xs font-bold text-[#5CAFE1] uppercase mb-1">Email:</p>
                  <h3 className="text-sm text-gray-700 font-medium mb-2">{patient.email}</h3>

                  <p className="text-xs font-bold text-[#5CAFE1] uppercase mb-1">Phone:</p>
                  <h3 className="text-sm text-gray-700 font-medium mb-2">{patient.phone}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl text-center space-y-4 w-80">
            <p className="text-base font-medium text-gray-800">
              Are you sure you want to delete patient <strong>{deleteTarget.name}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(deleteTarget.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition duration-300 ease-in-out cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm transition duration-300 ease-in-out cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
