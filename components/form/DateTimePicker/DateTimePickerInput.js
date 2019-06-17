import React, { useState } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableWithoutFeedback, View } from 'react-native';

import Input from '../Input';
import Colors from '../../../constants/Colors';

const DateTimePickerInput = ({ inputProps, pickerProps }) => {
    const [
        isDateTimePickerVisible,
        setDateTimePickerVisible
    ] = useState(false);

    const showDateTimePicker = () => {
        setDateTimePickerVisible(true);
    };

    const hideDateTimePicker = () => {
        setDateTimePickerVisible(false);
    };

    const handleDatePicked = date => {
        hideDateTimePicker();
        if (inputProps && inputProps.onConfirm) inputProps.onConfirm(date);
    };

    const overwritePickerProps = {
        isVisible: isDateTimePickerVisible,
        onConfirm: handleDatePicked,
        onCancel: hideDateTimePicker,
        cancelTextStyle: { color: Colors.buttonPrimary },
        confirmTextStyle: { color: Colors.buttonPrimary },
    };
    const mergedPickerProps = { ...pickerProps, ...overwritePickerProps };

    return (<>
        <TouchableWithoutFeedback onPress={showDateTimePicker}
            testID="inputWrapper">
            <View pointerEvents='box-only'>
                <Input {...inputProps} editable={false} />
            </View>
        </TouchableWithoutFeedback>
        <DateTimePicker
            testID="picker"
            {...mergedPickerProps}
        />
    </>);
};


export default DateTimePickerInput;
