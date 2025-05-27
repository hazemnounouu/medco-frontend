import { Box, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Admin/Header";
import { useTheme } from "@mui/material";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/AuthContext";

import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';


import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import axios from "axios";

const Appointments = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { token } = useContext(AuthContext);


    const fetchAppointments = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/appointments/doctor', {
                headers: { Authorization: `Bearer ${token}` }
            }
            );
            if (res.status === 200) {
                setAppointments(res.data.data);
                setIsLoading(false);
            }

        } catch (error) {
            console.error('Error fetching appointments:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);


    // DATA GRID

    const columns = [
        // { field: "id", headerName: "ID", flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            cellClassName: "name-column--cell",
        },
        {
            field: 'image',
            headerName: 'Image',
            // width: 150,
            // editable: true,
            renderCell: (params) => <img width={35} className="rounded-full" src={params.value} />, // renderCell will render the component
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1
        },
        {
            field: "phone",
            headerName: "Phone",
            flex: 1,
        },
        {
            field: "gender",
            headerName: "Gender",
            renderCell: ({ row: { gender } }) => {
                gender = 'male'

                if (gender == 'Not Selected') {

                    return (
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            N/A
                        </Typography>
                    )
                }

                return (
                    <Box
                        width="=100%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            gender === "male"
                                ? colors.blueAccent[600]
                                : colors.pinkAccent[400]
                        }
                        borderRadius="4px"
                    >
                        {gender === "male" && <MaleOutlinedIcon />}
                        {gender === "female" && <FemaleOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {gender}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "dob",
            headerName: "Date Of Birth",
            flex: 1,
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
                        onClick={handleDeleteApointment(id)}
                        color="inherit"
                    />,
                ];
            },
        },





    ];

    return (
        <Box m="20px">
            <Header
                title="APPOINTMENTS"
                subtitle="List of Appointments"
            />
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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={appointments}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(row) => row._id}
                />
            </Box>
        </Box>
    );
};

export default Appointments;
