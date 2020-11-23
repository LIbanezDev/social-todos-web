import React from 'react';
import { Checkbox, CheckboxProps, FormControlLabel } from '@material-ui/core';
import { useField } from 'formik';

export interface MyCheckboxProps extends CheckboxProps {
	name: string;
	value?: string | number;
	label?: string;
}

const CheckBox = (props: MyCheckboxProps) => {
	const [field] = useField({
		name: props.name,
		type: 'checkbox',
		value: props.value,
	});
	return <FormControlLabel control={<Checkbox {...props} {...field} />} label={props.label} />;
};

export default CheckBox;
