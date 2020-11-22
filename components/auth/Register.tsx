import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import {
	Box,
	Card,
	CardContent,
	FormGroup,
	TextField,
	Typography,
	Button,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Upload } from './FileUpload';
import { useRegisterMutation } from '../../__generated__/GraphQLTypes';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';

const initialValues = {
	name: '',
	email: '',
	password: '',
	bornDate: null,
};

const Register = () => {
	const [register] = useRegisterMutation();
	const [selectedFile, setSelectedFile] = useState<File>(null);
	const [imageSrc, setImageSrc] = useState<string>(null);

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const photo = event.target.files[0];
		setSelectedFile(photo);
		setImageSrc(URL.createObjectURL(photo));
	};

	const { enqueueSnackbar } = useSnackbar();

	return (
		<div className='animate__animated animate__fadeIn'>
			<Card elevation={5}>
				<CardContent>
					<Typography variant='srOnly'> Register </Typography>
					<Formik
						initialValues={initialValues}
						onSubmit={async (values, formikHelpers) => {
							const { data } = await register({
								variables: {
									data: {
										...values,
										image: selectedFile,
									},
								},
							});
							console.log(data);
							enqueueSnackbar(data.register.msg, {
								variant: data.register.ok ? 'success' : 'error',
							});
							if (data.register.ok) {
								formikHelpers.resetForm();
								setImageSrc(null);
							}
						}}
					>
						{props => (
							<Form autoComplete='off'>
								<Box marginBottom={2}>
									<FormGroup>
										<Field
											name='name'
											type='text'
											as={TextField}
											label='Name'
										/>
									</FormGroup>
								</Box>
								<Box marginBottom={2}>
									<FormGroup>
										<Field
											name='email'
											as={TextField}
											label='Email'
										/>
									</FormGroup>
								</Box>
								<Box marginBottom={2}>
									<FormGroup>
										<Field
											name='password'
											type='password'
											as={TextField}
											label='Password'
										/>
									</FormGroup>
								</Box>
								<Box marginBottom={2}>
									<MuiPickersUtilsProvider
										utils={DateFnsUtils}
										locale={esLocale}
									>
										<KeyboardDatePicker
											id='date-picker-dialog'
											label='Fecha de nacimiento'
											inputVariant='outlined'
											variant='inline'
											format='dd/MM/yyyy'
											value={props.values.bornDate}
											onChange={(
												date: Date,
												value: string
											) =>
												props.setFieldValue(
													'bornDate',
													value
												)
											}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</MuiPickersUtilsProvider>
								</Box>
								{selectedFile && (
									<img
										src={imageSrc}
										style={{ height: '200px' }}
										alt='Preview Image'
									/>
								)}
								<Box marginBottom={2}>
									<Upload onChange={onFileChange} />
								</Box>
								<br />
								<Button
									startIcon={
										props.isSubmitting ? (
											<CircularProgress size={24} />
										) : null
									}
									variant='contained'
									color='primary'
									disabled={props.isSubmitting}
									type='submit'
								>
									Register
								</Button>
								<pre>
									{' '}
									{JSON.stringify(props.values, null, 4)}
								</pre>
							</Form>
						)}
					</Formik>
				</CardContent>
			</Card>
		</div>
	);
};

export default Register;
