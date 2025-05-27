import { Box, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Admin/Header";
import { useTheme } from "@mui/material";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/AuthContext";

import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import axios from "axios";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

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
            console.log(res.data)
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
            field: "userData.name",
            headerName: "Patient Name",
            valueGetter: ({ row }) => row.userData.name,
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "slotDate",
            headerName: "Date",
                        flex: 1,

        },
        {
            field: 'slotTime',
            headerName: 'Time',
                        flex: 1,

            // width: 150,
            // editable: true,
        },
        {
            field: "userData.phone",
            headerName: "Patient Phone",
                        flex: 1,

            valueGetter: ({ row }) => row.userData.phone,
        },
        {

            field: "userData.email",
            headerName: "Patient Email",
                        flex: 1,

            valueGetter: ({ row }) => row.userData.email,
        },
        {
            field: "userData.gender",
            headerName: "Gender",
            width: 130,
            valueGetter: ({ row }) => row.userData.gender,
            renderCell: ({ row }) => {
                const gender = row.userData.gender;

                if (gender === 'Not Selected') {
                    return (
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            N/A
                        </Typography>
                    );
                }

                return (
                    <Box
                        width="100%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            gender === "Male"
                                ? colors.blueAccent[600]
                                : colors.pinkAccent[400]
                        }
                        borderRadius="4px"
                    >
                        {gender === "Male" && <MaleOutlinedIcon />}
                        {gender === "Female" && <FemaleOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {gender}
                        </Typography>
                    </Box>
                );
            },
        }, {
            field: "cancelled",
            headerName: "Status",
            width: 130,
            renderCell: ({ row }) => {
                const cancelled = row.cancelled;

                return (
                    <Box
                        width="100%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            cancelled === true
                                ? colors.redAccent[600]
                                : colors.greenAccent[600]
                        }
                        borderRadius="4px"
                    >
                        {cancelled && <CloseOutlinedIcon />}
                        {!cancelled && <CheckOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {cancelled ? "Canceled" : "Waiting"}
                        </Typography>
                    </Box>
                );
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
