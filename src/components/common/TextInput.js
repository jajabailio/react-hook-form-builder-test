import { Grid, TextField } from '@mui/material';

const TextInput = ({ gridItemSize, label, name, register, error, gridConfig = {}, inputConfig = {} }) => {
	return (
		<Grid item xs={gridItemSize} {...gridConfig}>
			<TextField label={label} variant="outlined" fullWidth error={error ? true : false} helperText={error || ''} {...register(name)} {...inputConfig} />
		</Grid>
	);
};

export default TextInput;
