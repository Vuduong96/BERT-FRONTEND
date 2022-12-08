import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import Header from "../../components/Header";
import axios from 'axios';
import { useEffect, useState } from 'react';


const baseUrl = "http://localhost:5000"



const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [userList, setUserList] = useState([]);

    // FETCH USER OBJECT FROM API
    const fetchUsers = async () => {
        const data = await axios.get(`${baseUrl}/users`)
        const { users } = data.data
        setUserList(users);
        console.log(users);
    }

    const columns = [
        { field: "id", headerName: "ID" }, 
        {   
            field:"First_name", 
            headerName:"First Name", 
            flex: 1, 
            cellClassName:"name-column--cell", 
        },
        {   
            field:"Last_name", 
            headerName:"Last Name", 
            flex: 1, 
            cellClassName:"name-column--cell", 
        },  
        {   
            field:"Email", 
            headerName:"Email", 
            flex: 1, 
        },
        {   
            field:"Role", 
            headerName:"Access Level", 
            flex: 1, 
            renderCell: ({ row: { Role }}) => {
                return (
                    <Box
                    width="60%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={
                        Role === "admin"
                        ? colors.greenAccent[600]
                        : colors.greenAccent[700]
                    }
                    borderRadius="4px"
                    >
                    {Role === "admin" && <AdminPanelSettingsOutlinedIcon />}
                    {Role === "manager" && <SecurityOutlinedIcon />}
                    {Role === "guest" && <LockOpenOutlinedIcon />}
                    {Role === null && <NoAccountsOutlinedIcon />}
                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        {Role}
                    </Typography>
                    </Box>
                );
            },
        },
    ];
    // { CALL fetchUsers function }           
    useEffect(() => {
        fetchUsers();
    }, [])
    return (
        <Box m="20px">
            <Header title="TEAM" subtitle ="Managing the Team Members" />
            <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border:"none"
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none"
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
            }}
            >
                <DataGrid 
                    rows={userList}
                    columns={columns}
                />
            </Box>
        </Box>
    )
}

export default Team;
