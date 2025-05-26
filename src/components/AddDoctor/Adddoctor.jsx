import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function AddDoctor() {

  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("")
  const [CreadtedAlert, setCreatedAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  let { userLogin } = useContext(UserContext)

  if (!userLogin) {
    return null; //
  }

  // Handle form submission
  function handleAddDoctor(values) {
    setIsLoading(true)

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('speciality', values.speciality);
    formData.append('degree', values.degree);
    formData.append('experience', values.experience);
    formData.append('about', values.about);
    formData.append('fees', values.fees);

    // Combine the city, street, and building into one address object
    const address = {
      city: values.city,
      street: values.street,
      building: values.building,
    };
    formData.append('address', JSON.stringify(address));  // Send address as a JSON string

    formData.append('image', values.image); // Assuming 'values.image' is a file object

    axios
      .post('http://localhost:4000/api/admin/add-doctor', formData, {
        headers: {
          'atoken': userLogin,
          'Content-Type': 'multipart/form-data' // Set proper content type for file uploads
        }
      })
      .then((res) => {
        setIsLoading(false)
        if (res.data.success === true) {
          console.log(res)
          localStorage.setItem('userToken', res.data.token)
          setApiError("")
          setCreatedAlert(true)

          formik.resetForm(); // Reset the form
          navigate('/viewdoctor')

        }
      })
      .catch((res) => {
        setIsLoading(false)
        setApiError("Something is wrong, Try again!")
        console.log(res);

        setCreatedAlert(false)
      })
  }


  // Formik setup
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      speciality: '',
      degree: '',
      experience: '',
      about: '',
      fees: '',
      address: '',
      image: '',
      city: "",
      street: "",
      building: ""
    },
    onSubmit: handleAddDoctor,
  })

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-10">
        <h2 className="text-2xl font-semibold text-center text-[#5CAFE1] mb-6">
          Add New Doctor
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
                placeholder="Enter Name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
                placeholder="Enter email address"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
                placeholder="Enter password"
              />
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-gray-700">Specialty</label>
              <input
                type="text"
                name="speciality"
                value={formik.values.speciality}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
                placeholder="Enter doctor's specialty"
              />
            </div>

            {/* Degree */}
            <div>
              <label className="block text-gray-700">Degree</label>
              <input
                type="text"
                name="degree"
                value={formik.values.degree}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
                placeholder="Enter doctor's degree"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-gray-700">Experience</label>
              <input
                type="text"
                name="experience"
                value={formik.values.experience}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
                placeholder="Enter years of experience"
              />
            </div>

            {/* About */}
            <div>
              <label className="block text-gray-700">About</label>
              <textarea
                name="about"
                value={formik.values.about}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
                placeholder="About the doctor"
              ></textarea>
            </div>

            {/* Fees */}
            <div>
              <label className="block text-gray-700">Fees</label>
              <input
                type="number"
                name="fees"
                value={formik.values.fees}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
                placeholder="Enter consultation fees"
              />
            </div>

            {/* City */}
            <div className="col-span-2">
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
                placeholder="Enter city"
              />
            </div>

            {/* Street */}
            <div className="col-span-2">
              <label className="block text-gray-700">Street</label>
              <input
                type="text"
                name="street"
                value={formik.values.street}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
                placeholder="Enter street"
              />
            </div>

            {/* Building */}
            <div className="col-span-2">
              <label className="block text-gray-700">Building</label>
              <input
                type="text"
                name="building"
                value={formik.values.building}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
                placeholder="Enter building"
              />
            </div>


            {/* Image */}
            <div>
              <label className="block text-gray-700">Doctor's Image</label>
              <input
                type="file"
                name="image"
                onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full bg-[#5CAFE1] hover:cursor-pointer hover:bg-[#4A9CB8] text-white font-semibold py-2 px-4 rounded-md transition duration-300">
              {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
              ) : "Add Doctor"}
            </button>
            {ApiError ? (
              <div className="p-2 w-full flex justify-center">
                <div className="flex items-center w-full max-w-md p-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg shadow-md" role="alert">
                  <svg className="flex-shrink-0 w-5 h-5 me-2 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 13a1 1 0 01-1 1h-5v2h3a1 1 0 010 2h-6a1 1 0 010-2h3v-2H3a1 1 0 01-.8-1.6l7-10a1 1 0 011.6 0l7 10a1 1 0 01.2.6zM10 12a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{ApiError}</span>
                </div>
              </div>
            ) : null}
            {CreadtedAlert ? (
              <div className="p-2 w-full flex justify-center">
                <div className="flex items-center w-full max-w-md p-4 text-green-800 bg-green-100 border border-green-300 rounded-lg shadow-md">
                  <svg className="flex-shrink-0 w-5 h-5 me-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">Doctor has been added!</span>
                </div>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}
