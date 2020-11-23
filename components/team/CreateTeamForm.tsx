import React, { useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Box, Button, FormGroup, TextField } from '@material-ui/core';
import CheckBox from '../auth/CheckBox';
import { CreateTeamInput, useCreateTeamMutation } from '../../__generated__/GraphQLTypes';
import { Upload } from '../auth/FileUpload';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export type FileState = {
	file: File;
	preview?: string;
};

interface CreateTeamInputs extends CreateTeamInput {
	isPrivate: boolean;
}

const initialValues: CreateTeamInputs = {
	name: '',
	description: '',
	isPrivate: false,
	password: '',
};

const CreateTeamForm = () => {
	const [createTeam] = useCreateTeamMutation();
	const [selectedFile, setSelectedFile] = useState<FileState>({
		file: null,
	});
	const { enqueueSnackbar } = useSnackbar();
	const { replace } = useRouter();

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const photo = event.target.files[0];
		setSelectedFile({
			file: photo,
			preview: URL.createObjectURL(photo),
		});
	};

	const handleCreateTeam = async (values: CreateTeamInputs, formikHelpers: FormikHelpers<CreateTeamInputs>) => {
		try {
			const { data, errors } = await createTeam({
				variables: {
					data: {
						name: values.name,
						description: values.description,
						image: selectedFile.file,
						password: values.password !== '' ? values.password : null,
					},
				},
			});
			if (errors) {
				return enqueueSnackbar('Hubo un error al crear el equipo, intente mas tarde', {
					variant: 'error',
				});
			}
			await replace('/teams/' + data.createTeam.team.id);
			enqueueSnackbar(data.createTeam.msg, {
				variant: data.createTeam.ok ? 'success' : 'error',
			});
			setSelectedFile({
				file: null,
			});
			formikHelpers.resetForm();
		} catch (e: unknown) {
			enqueueSnackbar('Hubo un error al crear el equipo, intente mas tarde', {
				variant: 'error',
			});
		}
	};
	return (
		<Formik initialValues={initialValues} onSubmit={handleCreateTeam}>
			{props => (
				<Form autoComplete='off'>
					<Box marginBottom={2}>
						<FormGroup>
							<Field name='name' type='text' as={TextField} label='Team Name' />
						</FormGroup>
					</Box>
					<Box marginBottom={2}>
						<FormGroup>
							<Field name='description' type='text' as={TextField} label='Description' />
						</FormGroup>
					</Box>
					{props.values.isPrivate && (
						<Box marginBottom={2}>
							<FormGroup>
								<Field name='password' type='text' as={TextField} label='Contraseña' />
							</FormGroup>
						</Box>
					)}
					<Box marginBottom={2}>
						<FormGroup>
							<CheckBox name={'isPrivate'} label={'Privado'} />
						</FormGroup>
					</Box>
					<Box marginBottom={2}>
						<Upload onChange={onFileChange} />
					</Box>
					{selectedFile.preview && (
						<img src={selectedFile.preview} style={{ height: '200px' }} alt='Team Preview' />
					)}
					<Box marginBottom={2}>
						<Button variant='contained' color='primary' type='submit'>
							Create Team
						</Button>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default CreateTeamForm;
