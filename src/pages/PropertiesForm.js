import { Card, CardContent, Container, Grid, Typography, Box } from '@mui/material';
import Joi from 'joi';
import FormBuilder from '../components/Form';

const PropertiesForm = () => {
	const defaultValues = [
		{
			id: '1',
			nationality: '',
			city: '',
			street: '',
			state: '',
		},
		{
			id: '2',
			nationality: '',
			city: '',
			street: '',
			state: '',
		},
		{
			id: '3',
			nationality: '',
			city: '',
			street: '',
			state: '',
		},
		{
			id: '4',
			nationality: '',
			city: '',
			street: '',
			state: '',
		},
		{
			id: '5',
			nationality: '',
			city: '',
			street: '',
			state: '',
		},
	];

	const listName = 'properties';

	const propertySchema = Joi.object({
		id: Joi.string().required(),
		nationality: Joi.string().required().label('Nationality'),
		city: Joi.string().required().label('City'),
		street: Joi.string().required().label('Street'),
		state: Joi.string().required().label('State'),
		properties: Joi.any(),
	});

	const schema = Joi.object({
		properties: Joi.array().items(propertySchema),
	});

	const formBuilderOptions = {
		listName,
		defaultValues,
		schema,
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
						Properties Form
					</Typography>
					<form onSubmit={handleSubmit(sanitizeSubmit(handleSave))}>
						{defaultValues.map((item, index) => (
							<Grid mt={3} container columnSpacing={2} rowSpacing={3} key={item.id}>
								{renderInput({
									name: `street`,
									label: 'Street',
									gridConfig: { xs: 3, md: 12 },
									index,
								})}
								{renderInput({ name: `city`, label: 'City', index })}
								{renderInput({ name: `state`, label: 'State', index })}
								{renderSelectInput({
									name: `nationality`,
									label: 'Nationality',
									options: nationalityOptions,
									gridConfig: { md: 12 },
									index,
								})}
								{index === defaultValues.length - 1 && (
									<Grid item xs={12} display="flex" justifyContent="center">
										{renderButton({ text: 'Save' })}
									</Grid>
								)}
							</Grid>
						))}
					</form>
				</CardContent>
			</Card>
		</Container>
	);
};

export default PropertiesForm;
