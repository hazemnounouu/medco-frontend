import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { NavLink } from 'react-router-dom';

export default function Viewdoctor() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const { userLogin } = useContext(UserContext);

  if (!userLogin) {
    return null; // Hide page if user is not logged in
  }

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/doctor/list?speciality=');
      if (res.status === 200) {
        setDoctors(res.data.data);
        setFilteredDoctors(res.data.data);
        setLoading(false);
      }

    } catch (error) {
      console.error('Error fetching doctors:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (searchEmail.trim() === '') {
      setDoctors(filteredDoctors);
    } else {
      const filtered = filteredDoctors.filter(doc =>
        (doc.email || '').toLowerCase().includes(searchEmail.toLowerCase())
      );
      setDoctors(filtered);
    }
  }, [searchEmail, filteredDoctors]);

  function handleDelete(id) {
    axios
      .delete('http://localhost:4000/api/admin/delete-doctor', {
        headers: {
          'atoken': userLogin,
          'Content-Type': 'application/json',
        },
        data: { "docId": id },
      })
      .then(() => {
        setDeleteTarget(null);
        axios.get('http://localhost:4000/api/doctor/list?speciality=')
          .then((res) => {
            setDoctors(res.data.data);
            setFilteredDoctors(res.data.data);
          });
      })
      .catch((err) => {
        console.error('Error deleting doctor:', err);
      });
  }

  return (
    <div className="pl-64 bg-gray-50 min-h-screen py-10 px-6">
      <h2 className="text-2xl font-semibold mx-96 px-30 pb-5 text-[#5CAFE1] mb-6">
        Doctors List
      </h2>

      {/* Search input */}
      <div className="flex align-middle justify-between w-1/2">

        <div className="max-w-md mb-6 pb-2">
          <label className="block text-sm font-medium text-[#5CAFE1] mb-1">Search by Doctor Email</label>
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Type doctor email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[#5CAFE1] focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
          />
        </div>

        <div className='p-8'>
          <NavLink to={'/adddoctor'}>

            <button
              type="submit"
              className="bg-green-600 hover:cursor-pointer hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
              Add Doctor
            </button>
          </NavLink>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-start">
          {doctors.length === 0 ? (
            <p className="text-[#5CAFE1] text-lg">No doctor matches the current email search.</p>
          ) : (
            doctors.map((doctor, index) => (
              <div
                key={doctor._id || index}
                className="relative w-72 bg-white rounded-2xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out overflow-hidden border border-gray-200"
              >
                <button
                  onClick={() => setDeleteTarget({ id: doctor._id, name: doctor.name })}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer transition duration-200 ease-in-out"
                  title="Delete Doctor"
                >
                  <strong>X</strong>
                  {/* <svg
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height={100}
                    focusable={true}
                    color='red'
                    >
                    <path
                      fill={20}
                      d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m5 5h-2.5l-1-1h-3l-1 1H7v2h10zM9 18h6a1 1 0 0 0 1-1v-7H8v7a1 1 0 0 0 1 1"
                    />
                  </svg> */}

                </button>

                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-xs font-bold text-[#5CAFE1] uppercase mb-1">Name:</p>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">{doctor.name}</h2>

                  <p className="text-xs font-bold text-[#5CAFE1] uppercase mb-1">Email:</p>
                  <h3 className="text-sm text-gray-700 font-medium mb-2">{doctor.email}</h3>

                  <p className="text-xs font-bold text-[#5CAFE1] uppercase mb-1">Department:</p>
                  <h3 className="text-sm text-gray-700 font-medium mb-2">{doctor.speciality}</h3>

                  <p className="text-sm text-gray-600 mt-2">
                    <span className="text-[#5CAFE1] font-semibold">Experience:</span>
                  </p>
                  <h3 className="text-sm text-gray-700 font-medium mb-2">{doctor.experience}</h3>
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
              Are you sure you want to delete Dr. <strong>{deleteTarget.name}</strong>?
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
