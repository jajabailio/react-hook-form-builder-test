import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import Joi from 'joi';
import FormBuilder from '../components/Form';

const UserForm = () => {
	const defaultValues = {
		id: '1',
		nationality: '',
		email: '',
		firstName: '',
		lastName: '',
	};

	const listName = 'users';

	const userSchema = Joi.object({
		id: Joi.string().required(),
		nationality: Joi.string().required().label('Nationality'),
		firstName: Joi.string().required().label('First Name'),
		lastName: Joi.string().required().label('Last Name'),
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.label('Email'),
		users: Joi.any()
	});

	const formBuilderOptions = {
		listName,
		defaultValues,
		schema: userSchema,
		gridItemSize: 6,
	};

	const { renderInput, renderSelectInput, renderButton, handleSubmit, sanitizeSubmit } = FormBuilder(formBuilderOptions);

	const handleSave = formValues => {
		console.log('formValues: ', formValues);
	};

	const nationalityOptions = [
		{
			id: '1',
			title: 'Filipino',
		},
		{
			id: '2',
			title: 'American',
		},
		{
			id: '3',
			title: 'Japanese',
		},
		{
			id: '4',
			title: 'Korean',
		},
		{
			id: '5',
			title: 'Others',
		},
	];

	return (
		<Container sx={{ display: 'flex', justifyContent: 'center' }}>
			<Card sx={{ width: { xs: '100%', md: '70%', lg: '60%' }, p: 1 }}>
				<CardContent>
					<Typography variant="h5" mb={4}>
						User Form
					</Typography>
					<form onSubmit={handleSubmit(sanitizeSubmit(handleSave))}>
						<Grid mt={3} container columnSpacing={2} rowSpacing={3}>
							{renderInput({
								name: `firstName`,
								label: 'First Name',
								gridConfig: { xs: 3, md: 12 },
							})}
							{renderInput({ name: `lastName`, label: 'Last Name' })}
							{renderInput({ name: `email`, label: 'Email' })}
							{renderSelectInput({
								name: `nationality`,
								label: 'Nationality',
								options: nationalityOptions,
								gridConfig: { md: 12 },
							})}
							<Grid item xs={12} display="flex" justifyContent="center">
								{renderButton({ text: 'Save' })}
							</Grid>
						</Grid>
					</form>
				</CardContent>
			</Card>
		</Container>
	);
};

export default UserForm;
