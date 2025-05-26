import { Box, Button, TextField } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Admin/Header";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/AuthContext";
import axios from "axios";

const AddDoctor = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("")
  const [CreadtedAlert, setCreatedAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  let { userLogin } = useContext(UserContext)

  if (!userLogin) {
    return null; //
  }

  const addDoctor = async (formData) => {
    console.log('START');




    try {
      const res = await axios
        .post('http://localhost:4000/api/admin/add-doctor', formData, {
          headers: {
            'atoken': userLogin,
            'Content-Type': 'multipart/form-data' // Set proper content type for file uploads
          }
        })

      console.log(res);

      if (res.data.success === true) {
        setApiError("")
        setIsLoading(false)
        setCreatedAlert(true)

        formik.resetForm(); // Reset the form
        navigate('/doctors')

      }

    } catch (error) {

      setIsLoading(false);
      setApiError("Something is wrong, Try again!")

      setCreatedAlert(false)

      console.log(error)

    }

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



    console.log(values.image)


    addDoctor(formData)

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
      city: "",
      street: "",
      building: "",
      image: null,
    },
    onSubmit: handleAddDoctor,
  })




  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleAddDoctor}
        initialValues={formik.initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField

                variant="filled"
                type="text"
                label="Speciality"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.speciality}
                name="speciality"
                error={!!touched.speciality && !!errors.speciality}
                helperText={touched.speciality && errors.speciality}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Degree"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.degree}
                name="degree"
                error={!!touched.degree && !!errors.degree}
                helperText={touched.degree && errors.degree}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Experience"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.experience}
                name="experience"
                error={!!touched.experience && !!errors.experience}
                helperText={touched.experience && errors.experience}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="About"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.about}
                name="about"
                error={!!touched.about && !!errors.about}
                helperText={touched.about && errors.about}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Fees"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fees}
                name="fees"
                error={!!touched.fees && !!errors.fees}
                helperText={touched.fees && errors.fees}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Street"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street}
                name="street"
                error={!!touched.street && !!errors.street}
                helperText={touched.street && errors.street}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Building"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.building}
                name="building"
                error={!!touched.building && !!errors.building}
                helperText={touched.building && errors.building}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                variant="filled"
                type="file"
                label="Upload Image"
                onBlur={handleBlur}
                // onChange={handleChange}
                onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])}

                value={values.image}
                name="image"
                error={!!touched.image && !!errors.image}
                helperText={touched.image && errors.image}
                sx={{ gridColumn: "span 2" }}
              />

              {/* <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  const image = event.currentTarget.files[0];
                  formik.setFieldValue('image', image);
                }}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CAFE1]"
              /> */}


            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Doctor
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  // password: yup.string().required("required").length(6),
  speciality: yup.string().required("required"),
  experience: yup.string().required("required"),
  degree: yup.string().required("required"),
  about: yup.string().required("required"),
  about: yup.string().required("required"),


  city: yup.string().required("required"),
  street: yup.string().required("required"),
  building: yup.string().required("required"),

  // image: yup.string().required("required"),



  fees: yup.number().required("required"),


});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default AddDoctor;
