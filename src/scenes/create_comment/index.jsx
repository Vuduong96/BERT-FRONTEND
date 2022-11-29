import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Formik } from "formik";
import { tokens } from "../../theme";
import { mockDataComments } from "../../data/mockData";
import Header from "../../components/Header";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as yup from "yup";



const CreateComment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = (values) => {
    console.log(values);
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
                    handleBlur, 
                    handleChange, 
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
  comment: "",
};

const checkoutSchema = yup.object().shape({
  comment: yup.string().required("required"),
});

export default CreateComment;