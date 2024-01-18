import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import styles from './styles/Form1.module.scss';
import { RootState } from './store';
import { updateForm } from './formSlice';
import { useNavigate } from 'react-router-dom';
import DataTableComponent from './Datatable';
import Layout from './Layout';


const Form1: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const personalDetails = useSelector((state: RootState) => {
    console.log(state);
    return state.form;
  });
  const genderOptions = ['Male', 'Female', 'Other']

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Min 3 characters required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .integer('Age must be an integer')
      .positive('Age must be a positive integer')
      .required('Age is required'),
    sex: Yup.string().required('Sex is required').oneOf(genderOptions.map((c) => c), 'Invalid gender'),
    mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
    govIdType: Yup.string().oneOf(['Aadhar', 'PAN']),
    govId: Yup.string().test('conditional-validation', 'Invalid Government ID', function (value: any) {
      const { govIdType } = this.parent;

      if (govIdType === 'Aadhar') {
        return /^[2-9]\d{11}$/.test(value) || this.createError({ message: 'Invalid Aadhar number' });
      } else if (govIdType === 'PAN') {
        return /^[A-Z0-9]{10}$/.test(value) || this.createError({ message: 'Invalid PAN number' });
      }
      return true;
    }),
  });

  const handleSubmit = (values: typeof personalDetails) => {
    dispatch(updateForm(values));
    navigate('/form2')
  };

  return (
    <Layout>
      <Formik
        initialValues={personalDetails}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className={styles.formContainer}>
            <Grid container spacing={2} className={styles.formContainer}>
              <Grid item xs={12} sm={6} className={styles.formGridItem} >
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

              <Grid item xs={12} sm={6} className={styles.formGridItem}>
                <TextField
                  label="Age"
                  variant="outlined"
                  fullWidth
                  type="number"
                  id="age"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                />
              </Grid>

              <Grid item xs={12} sm={6} className={styles.formGridItem}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="sex-label">Sex</InputLabel>
                  <Select
                    labelId="sex-label"
                    label="Sex"
                    id="sex"
                    name="sex"
                    value={formik.values.sex}
                    onChange={formik.handleChange}
                    error={formik.touched.sex && Boolean(formik.errors.sex)}
                  >
                    <MenuItem value="" disabled>Select a sex</MenuItem>
                    {genderOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} className={styles.formGridItem}>
                <TextField
                  label="Mobile"
                  variant="outlined"
                  fullWidth
                  type="number"
                  id="mobile"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                />
              </Grid>

              <Grid item xs={12} sm={6} className={styles.formGridItem}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="govIdType-label">Government ID Type</InputLabel>
                  <Select
                    labelId="govIdType-label"
                    label="Government ID Type"
                    id="govIdType"
                    name="govIdType"
                    value={formik.values.govIdType}
                    onChange={formik.handleChange}
                    error={formik.touched.govIdType && Boolean(formik.errors.govIdType)}
                  >
                    <MenuItem value="" disabled>Select a Government ID Type</MenuItem>
                    <MenuItem value="Aadhar">Aadhar</MenuItem>
                    <MenuItem value="PAN">PAN</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {formik.values.govIdType && (
                <Grid item xs={12} sm={6} className={styles.formGridItem}>
                  <TextField
                    label="Government ID"
                    variant="outlined"
                    fullWidth
                    type="text"
                    id="govId"
                    name="govId"
                    value={formik.values.govId}
                    onChange={formik.handleChange}
                    error={formik.touched.govId && Boolean(formik.errors.govId)}
                    helperText={formik.touched.govId && formik.errors.govId}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" className={styles.formButton} >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}

      </Formik>
      
    </Layout>
  );
};

export default Form1;
