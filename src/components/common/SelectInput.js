import { Grid, InputLabel, Select, MenuItem, FormControl, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

const SelectInput = ({ gridItemSize, name, label, error, defaultValue = '', options, control, gridConfig = {}, inputConfig = {} }) => {
	return (
		<Grid item xs={gridItemSize} {...gridConfig}>
			<Controller
				control={control}
				name={name}
				defaultValue={defaultValue}
				render={({ field }) => (
					<FormControl fullWidth error={error ? true : false}>
						<InputLabel id={`${name}-label-id`}>Nationality</InputLabel>
						<Select {...field} labelId={`${name}-label-id`} label={label} variant="outlined" value={field.value} name={name} {...inputConfig}>
							{options?.map(option => (
								<MenuItem key={option.id} value={option.id.toString()}>
									{option.title}
								</MenuItem>
							))}
						</Select>
						{error && <FormHelperText>{error}</FormHelperText>}
					</FormControl>
				)}
			/>
		</Grid>
	);
};

export default SelectInput;
