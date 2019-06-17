import React from 'react';
import DateTimePicker from '../DateTimePicker';

export const overwriteProps = {
    mode: 'time', 
    titleIOS: 'Pick time'
};

const TimePicker = props => {
    const {pickerProps, value, ...inputProps} = props;
    const pickerPropsWithValue = {...pickerProps, date: value};
    inputProps.value = value ? value.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
    const mergedPickerProps = {...pickerPropsWithValue, ...overwriteProps};
    return(<DateTimePicker 
        pickerProps={mergedPickerProps}
        inputProps={inputProps}
    />)
}

export default TimePicker;
