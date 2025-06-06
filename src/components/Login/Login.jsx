import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios';
import style from "./Login.module.css"
import { useNavigate, Link } from 'react-router-dom';
import logo from "../../assets/empogin.jpg"
import { AuthContext } from '../../shared/context/AuthContext';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'




export default function Login() {

  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useContext(AuthContext);




  async function handleLogin(values) {
    setIsLoading(true);


    try {
      const res = await axios
        .post('http://localhost:4000/api/doctor/login', values)

      if (res.status == 201) {
        setIsLoading(false)

        console.log('DONE')

        const { role, id } = res.data.data;
        const token = res.data.token


        console.log(id, token, role)


        login(id, token, role);

        if (role == 'admin') {
          navigate("/dashboard")
        }
        else {
          navigate('/appointments')
        }
      } else {
        setIsLoading(false);
        setApiError(res.data.message)
      }
    }
    catch (error) {
      setIsLoading(false);
    }
  }

  let validationSchema = yup.object().shape(
    {
      email: yup.string().min(3, "minimum ID length is 3").required(),
      password: yup.string().required().min(6, "minmum password characters are 6 digits")
    }
  )


  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleLogin,

  })




  return <>

    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6  text-center"> Admin Login</h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />


            {formik.errors.email && formik.touched.email ? (
              <div className='p-4 mb-4 text-sm text-red-800 rounded-lg' role='alert'>
                <span className='font-medium'>
                  {formik.errors.email}
                </span>
              </div>
            ) : null}


          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 ">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />

            {formik.errors.password && formik.touched.password ? (
              <div className='p-4 mb-2 text-sm text-red-800 rounded-md' role='alert'>
                <span className='font-medium'>
                  {formik.errors.password}
                </span>
              </div>
            ) : null}


          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} />
              // <i className='fas fa-spinner fa-spin'></i>
            ) : "Login"}
          </button>
          {ApiError ? (
            <div className="mt-4 w-full flex justify-center pt-5">
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

        </form>
      </div>
    </div>






  </>
}
