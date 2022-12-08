import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataComments } from "../../data/mockData";
import Header from "../../components/Header";
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { PushSpinner } from "react-spinners-kit";



const baseUrl = "http://localhost:5000"



const Result = () => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate(); 


  const [resultsList, setResList] = useState([]);
  
  // { FETCH OBJECT FROM API }
  const fetchResults = async () => {
    const data = await axios.get(`${baseUrl}/predict_comments`)
    const { result } = data.data;
    setResList(result);
    console.log(resultsList);
  }



  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "Comment_id", headerName: "COMMENT ID", flex: 0.5 },
    {
      field: "Comment",
      headerName: "COMMENT",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "Predicted_at",
        headerName: "PREDICTED AT",
        flex: 1,
    },
    {
        field: "Topic",
        headerName: "TOPIC",
        flex: 1,
    }
  ];

  
  useEffect(() => {
    
    fetchResults();
    
  }, [])

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  return (

    <Box m="20px">
      <Header
      title="PREDICTED COMMENTS"
      subtitle="Prediction results made by users"
    />
      {loading ? <PushSpinner size={30} color="#686769" loading={loading} /> : (

            <Box
            m="40px 0 0 0"
            height="65vh"
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
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`
              }
            }}
            >
            <DataGrid
                                          checkboxSelection
                                          rows={resultsList}
                                          columns={columns}
                  />

            </Box>

      )}
      

    
  </Box>
  );
};

export default Result;