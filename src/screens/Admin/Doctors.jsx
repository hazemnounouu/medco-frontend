import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Admin/Header";

import { AuthContext } from "../../shared/context/AuthContext";


import { useState, useEffect, useContext } from "react";
import axios from "axios";

import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);


  const handleDeleteDoctor = (id) => async () => {

    try {
      const res = await axios
        .delete('http://localhost:4000/api/admin/delete-doctor', {
          headers: {
            'atoken': token,
            'Content-Type': 'application/json',
          },
          data: { "docId": id },
        });

      setDoctors(doctors.filter((doctor) => doctor._id !== id));
    } catch (error) {
      console.error('Error deleting doctor:', error);

    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/doctor/list?speciality=');
      if (res.status === 200) {
        setDoctors(res.data.data);
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



  const columns = [
    // { field: "_id", headerName: "ID",width:1000  },

    {
      field: 'image',
      headerName: 'Image',
      flex: 1,
      renderCell: (params) => <img width={35} className="rounded-full" src={params.value} />, // renderCell will render the component
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "speciality",
      headerName: "Speciality",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ row: { status } }) => {
        status = 'Pending'

        return (
          <Box
            width="=100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "Verified"
                ? colors.greenAccent[600]
                : colors.orangeAccent[500]
            }
            borderRadius="4px"
          >
            {status === "Verified" && <VerifiedUserOutlinedIcon />}
            {status === "Pending" && <WorkHistoryOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        // if (isInEditMode) {
        //   return [
        //     <GridActionsCellItem
        //       icon={<SaveIcon />}
        //       label="Save"
        //       material={{
        //         sx: {
        //           color: 'primary.main',
        //         },
        //       }}
        //       onClick={handleSaveClick(id)}
        //     />,
        //     <GridActionsCellItem
        //       icon={<CancelIcon />}
        //       label="Cancel"
        //       className="textPrimary"
        //       onClick={handleCancelClick(id)}
        //       color="inherit"
        //     />,
        //   ];
        // }

        return [
          // <GridActionsCellItem
          //   icon={<EditIcon />}
          //   label="Edit"
          //   className="textPrimary"
          //   onClick={handleEditClick(id)}
          //   color="inherit"
          // />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteDoctor(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Doctors" subtitle="Managing the Doctors" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >

        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
          </div>
        ) : (
          <DataGrid checkboxSelection rows={doctors} columns={columns} getRowId={(row) => row._id} />
        )
        }
      </Box>
    </Box>
  );
};

export default Team;
