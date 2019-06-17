import React from 'react';
import DateTimePicker from '../DateTimePicker';

export const overwriteProps = {
    mode: 'date', 
    titleIOS: 'Pick a date'
};

const DatePicker = props => {
    const {pickerProps, value, ...inputProps} = props;
    const pickerPropsWithValue = {...pickerProps, date: value};
    inputProps.value = value ? value.toLocaleDateString() : '';
    const mergedPickerProps = {...pickerPropsWithValue, ...overwriteProps};
    return(<DateTimePicker 
        pickerProps={mergedPickerProps}
        inputProps={inputProps}
    />)
}

export default DatePicker;
