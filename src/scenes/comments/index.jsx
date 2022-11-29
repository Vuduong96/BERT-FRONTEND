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


const Comments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "comment",
        headerName: "Comment",
        flex: 1,
    },
    {
        field: "date",
        headerName: "Date",
        flex: 1,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: ({ row: { status }}) => {
            return (
                <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                    status === false
                    ? colors.greenAccent[700]
                    : colors.greenAccent[500]
                }
                borderRadius="4px"
                >
                {status === true && <PublishedWithChangesOutlinedIcon />}
                {status === false && <RotateLeftOutlinedIcon />}
                </Box>
            );
        },
    },
    {
        field: "actionTopic",
        headerName: "View Topic",
        flex: 1,
        renderCell: ({ row: { actionTopic }}) => {
            return (
                <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                    actionTopic === true
                    ? colors.greenAccent[600]
                    : colors.redAccent[600]
                }
                borderRadius="4px"
                >
                {actionTopic === true && <VisibilityOutlinedIcon />}
                {actionTopic === false && <VisibilityOffOutlinedIcon /> }
                <Button>View</Button>
                </Box>
            );
        },
    },
    {
        field: "actionSenti",
        headerName: "View Sentiment",
        flex: 1,
        renderCell: ({ row: { actionSenti }}) => {
            return (
                <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                    actionSenti === true
                    ? colors.greenAccent[600]
                    : colors.redAccent[600]
                }
                borderRadius="4px"
                >
                {actionSenti === true && <VisibilityOutlinedIcon />}
                {actionSenti === false && <VisibilityOffOutlinedIcon /> }
                <Button>View</Button>
                </Box>
            );
        },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="COMMENTS"
        subtitle="List of Comments added by users"
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`
          }
        }}
      >
        <DataGrid
          checkboxSelection
          rows={mockDataComments}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Comments;