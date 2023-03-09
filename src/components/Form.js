import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import SelectInput from './common/SelectInput';
import TextInput from './common/TextInput';

const FormBuilder = ({ listName, defaultValues, schema, gridItemSize = 6 }) => {
	let initialDefaultValues = defaultValues;
	const isDefaultValuesAnArray = Array.isArray(defaultValues);

	if (isDefaultValuesAnArray) initialDefaultValues = { [listName]: defaultValues };

	const {
		register,
		handleSubmit,
		formState: { errors },
		...useFormMethods
	} = useForm({
		defaultValues: initialDefaultValues,
		resolver: joiResolver(schema),
	});

	const { fields, ...useFieldArrayMethods } = useFieldArray({
		name: listName,
		keyName: 'fieldId',
		control: useFormMethods.control,
	});

	console.log('errors: ', errors);

	const sanitizeSubmit = handler => formValues => {
		const values = { ...formValues };
		if (!isDefaultValuesAnArray) delete values[listName];

		handler(values);
	};

	const { setValue } = useFormMethods;

	const renderInput = ({ name, label, index = null, ...rest }) => {
		const inputName = index !== null ? `${listName}[${index}].${name}` : name;

		const loadError = { message: null };
		if (index !== null && errors[listName] && errors[listName][index]) {
			loadError.message = errors[listName][index][name].message;
		} else if (index > -1) {
			loadError.message = errors[name]?.message;
		}

		return <TextInput gridItemSize={gridItemSize} name={inputName} label={label} register={register} error={loadError.message} {...rest} />;
	};

	const renderSelectInput = ({ name, label, index = null, options, ...rest }) => {
		const inputName = index !== null ? `${listName}[${index}].${name}` : name;

		const loadError = { message: null };
		if (index !== null && errors[listName] && errors[listName][index]) {
			loadError.message = errors[listName][index][name].message;
		} else if (index > -1) {
			loadError.message = errors[name]?.message;
		}

		return (
			<SelectInput
				gridItemSize={gridItemSize}
				name={inputName}
				label={label}
				control={useFormMethods.control}
				options={options}
				error={loadError.message}
				{...rest}
			/>
		);
	};

	const renderButton = ({ type = 'submit', text = 'Submit', handler, ...rest }) => {
		return (
			<Button type={type} variant="contained" {...rest}>
				{text}
			</Button>
		);
	};

	return {
		handleSubmit,
		renderInput,
		renderSelectInput,
		renderButton,
		useFormMethods,
		useFieldArrayMethods,
		fields,
		setValue,
		sanitizeSubmit,
	};
};

export default FormBuilder;
