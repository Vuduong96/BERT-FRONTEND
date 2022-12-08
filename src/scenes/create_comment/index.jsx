import axios from 'axios';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Formik } from "formik";
import { tokens } from "../../theme";
import { mockDataComments } from "../../data/mockData";
import Header from "../../components/Header";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moment from "moment";
import {useNavigate} from 'react-router-dom';




const baseUrl = "http://localhost:5000"



const CreateComment = () => {

  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  const handleChange = e => {
    setComment(e.target.value);
    
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values) => {
    setComment(values);
    console.log('DATA', values);
    const data = await axios.post(`${baseUrl}/create_comment`, values);
    // 👇️ redirect to /comments
    navigate('/comments');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   // setComment('');
  }

  return (
    <Box m="20px">
      <Header
        title="PLEASE TYPE YOUR COMMENT"
        subtitle="User input a comment"
      />
      {/* { INPUT COMMENT BOX } */}
      <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema = {checkoutSchema}
            >
                {({ 
                    values, 
                    errors, 
                    touched, 
                    handleChange,
                    handleBlur, 
                    handleSubmit 
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box 
                            display="grid" 
                            gap="30px" 
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name='name'
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Date"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.date}
                                name="date"
                                error={!!touched.date && !!errors.date}
                                helperText={touched.date && errors.date}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Type here.."
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.comment}
                                name="comment"
                                error={!!touched.comment && !!errors.comment}
                                helperText={touched.comment && errors.comment}
                                sx={{ gridColumn: "span 4" }}
                            />
                           
                            
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                        
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Comment
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
    </Box>
  );
};


const initialValues = {
  name: "",
  comment: "",
  date: moment().format("DD-MM-YYYY hh:mm:ss"),
  user_id:1
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  comment: yup.string().required("required"),
  date: yup.string().required("required"),
});

export default CreateComment;