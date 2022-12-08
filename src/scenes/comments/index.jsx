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


const baseUrl = "http://localhost:5000"



const Comments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate(); 


  const [selectedRows, setSelectedRows] = useState([]);

  const [commentsList, setCommentsList] = useState([]);
  
  // { FETCH OBJECT FROM API }
  const fetchComments = async () => {
    const data = await axios.get(`${baseUrl}/comments`)
    const { comments } = data.data
    setCommentsList(comments);
    //console.log(data);
  }

  const routeChange = () =>{ 
    let path = `result`; 
    navigate(path);
  }


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "Comment",
        headerName: "Comment",
        flex: 1,
    },
    {
        field: "Date",
        headerName: "Date",
        flex: 1,
    },
    {
        field: "Status_topic",
        headerName: "Status Topic",
        flex: 1,
        renderCell: ({ row: { Status_topic }}) => {
            return (
                <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                    Status_topic === false
                    ? colors.greenAccent[700]
                    : colors.greenAccent[500]
                }
                borderRadius="4px"
                >
                {Status_topic === true && <PublishedWithChangesOutlinedIcon />}
                {Status_topic === false && <RotateLeftOutlinedIcon />}
                </Box>
            );
        },
    },
    {
      field: "Status_sentiment",
      headerName: "Status Sentiment",
      flex: 1,
      renderCell: ({ row: { Status_sentiment }}) => {
          return (
              <Box
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                  Status_sentiment === false
                  ? colors.greenAccent[700] 
                  : colors.greenAccent[500]
              }
              borderRadius="4px"
              >
              {Status_sentiment === true && <PublishedWithChangesOutlinedIcon />}
              {Status_sentiment === false && <RotateLeftOutlinedIcon />}
              </Box>
          );
      },
  },
    {
        field: "View_topic",
        headerName: "View Topic",
        flex: 1,
        renderCell: ({ row: { View_topic }}) => {
            return (
                <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                  View_topic === true
                    ? colors.greenAccent[600]
                    : colors.redAccent[400]
                }
                borderRadius="4px"
                >
                {View_topic === true && <Button><VisibilityOutlinedIcon /> View</Button>}
                {View_topic === false &&   <Button                
                > <VisibilityOffOutlinedIcon /></Button> }
              
                </Box>
            );
        },
    },
    {
        field: "View_senti",
        headerName: "View Sentiment",
        flex: 1,
        renderCell: ({ row: { View_senti }}) => {
            return (
                <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                  View_senti === true
                    ? colors.greenAccent[600]
                    : colors.redAccent[400]
                }
                borderRadius="4px"
                >
                {View_senti === true && <Button><VisibilityOutlinedIcon /> View</Button>}
                {View_senti === false &&   <Button> <VisibilityOffOutlinedIcon /> </Button> }
                </Box>
            );
        },
    },
    // {
    //   field: 'Action',
    //   headName: 'Action',
    //   sortable: false,
    //   width:100,
    //   renderCell: (params) => {
    //     const navigateToPredict = (e) => {
           
    //         navigate('/result/'+ params.row.id);
    //       };
  
    //     return  <Box
    //     width="60%"
    //     m="0 auto"
    //     p="5px"
    //     display="flex"
    //     justifyContent="center"
    //     backgroundColor={
    //        colors.greenAccent[400]
    //     }
    //     borderRadius="4px"
    //     >
    //     {<Button onClick={navigateToPredict}>Predict</Button> }
    //     </Box> ;
    //     }
    // }
  ];


  
  useEffect(() => {
    fetchComments();
  }, [])



  
  return (
    <Box m="20px">
      <Header
        title="COMMENTS"
        subtitle="List of Comments added by users"
      />
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
          rows={commentsList}
          columns={columns}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = commentsList.filter((row) =>
              selectedIDs.has(row.id),
            );
            var newcommentList = {};
            
            newcommentList['comments'] = selectedRows;

            //console.log(newcommentList);
            const updateComments = async () => {
              const data = await axios.put(`${baseUrl}/update_comments`,newcommentList);
              console.log(data);
            }

            updateComments();

          }}
        />
      </Box>
      <Box display="flex" justifyContent="end" mt="10px" b="50px" >
        <Button 
        type="submit" 
        color="secondary" 
        variant="contained"
        onClick={routeChange}
        >
              Get Result
         </Button>
       </Box>
    </Box>
  );
};

export default Comments;