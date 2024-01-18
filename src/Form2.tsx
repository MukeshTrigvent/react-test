import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/Form2.module.scss';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { RootState } from './store';
import { resetAddressDetails, updateAddressDetails } from './addressSlice';
import { addRecord } from './recordSlice';
import Layout from './Layout';
import { FormikHelpers } from 'formik';
import { resetForm } from './formSlice';

const Form2: React.FC = () => {
    const dispatch = useDispatch();
    const addressDetails = useSelector((state: RootState) => state.address);
    const personalDetails = useSelector((state: RootState) => state.form);
    const navigate = useNavigate();
    const [countryOptions, setCountryOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => {
                const countries = data.map((country: any) => ({
                    label: country.name.common,
                    value: country.name.common,
                }));
                setCountryOptions(countries);
            })
            .catch((error) => {
                console.error('Error fetching country options:', error);
            });
    }, []);

    const validationSchema = Yup.object({
        address: Yup.string().optional(),
        state: Yup.string().optional(),
        city: Yup.string().optional(),
        country: Yup.string()
            .optional()
            .oneOf(countryOptions.map((c) => c.value), 'Invalid country'),
        pincode: Yup.string()
            .optional()
            .matches(/^\d+$/, 'Invalid pincode. Numeric only'),
    });

    const handleSubmit = (values: typeof addressDetails) => {
        dispatch(updateAddressDetails(values));
        const combinedData = {
            ...personalDetails,
            ...addressDetails,
        };
        dispatch(addRecord(combinedData));
        dispatch(resetAddressDetails());
        dispatch(resetForm());
        // resetForm()
        navigate('/success');
    };

    return (
        <Layout>
            <Formik
                initialValues={addressDetails}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form className={styles.formContainer}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} className={styles.formGridItem}>
                                <TextField
                                    label="Address (optional)"
                                    variant="outlined"
                                    fullWidth
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} className={styles.formGridItem}>
                                <TextField
                                    label="State (optional)"
                                    variant="outlined"
                                    fullWidth
                                    id="state"
                                    type="text"
                                    name="state"
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    error={formik.touched.state && Boolean(formik.errors.state)}
                                    helperText={formik.touched.state && formik.errors.state}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} className={styles.formGridItem}>
                                <TextField
                                    label="City (optional)"
                                    variant="outlined"
                                    fullWidth
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    error={formik.touched.city && Boolean(formik.errors.city)}
                                    helperText={formik.touched.city && formik.errors.city}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} className={styles.formGridItem}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="country-label">Country</InputLabel>
                                    <Select
                                        labelId="country-label"
                                        label="Country"
                                        id="country"
                                        name="country"
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                        className={styles.countrySelect}
                                        error={formik.touched.country && Boolean(formik.errors.country)}
                                    >
                                        <MenuItem value="" disabled>
                                            Select a country
                                        </MenuItem>
                                        {countryOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} className={styles.formGridItem}>
                                <TextField
                                    label="Pincode (optional)"
                                    variant="outlined"
                                    fullWidth
                                    id="pincode"
                                    type="number"
                                    name="pincode"
                                    value={formik.values.pincode}
                                    onChange={formik.handleChange}
                                    error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                                    helperText={formik.touched.pincode && formik.errors.pincode}
                                />
                            </Grid>

                            <Grid item xs={6} className={styles.formGridItem}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => navigate('/')}
                                    className={styles.formButton}
                                >
                                    Go back
                                </Button>
                            </Grid>

                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={styles.submitButton}
                                >
                                    SUBMIT
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Layout>

    );
};

export default Form2;
