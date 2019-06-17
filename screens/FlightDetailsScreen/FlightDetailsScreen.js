import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import {
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux'
import { addHours, setHours, setMinutes, getHours, getMinutes} from 'date-fns';

import Input from '../../components/form/Input';
import DatePicker from '../../components/form/DatePicker';
import TimePicker from '../../components/form/TimePicker';
import Colors from '../../constants/Colors';
import { 
  setField, setValidated, submitForm } from '../../redux/form/actions';
import {
  required, dateAfter, timeAfter, runValidators, getValueAndError,
} from '../../utils/formValidation'

const setTimeForDate = (time, date) => setHours(
  setMinutes(date, getMinutes(time)),
  getHours(time)
);

const formatPayload = fields => {    
  const inboundDate = getValueAndError(fields, 'inDate')[0];
  const inboundTime = getValueAndError(fields, 'inTime')[0];
  const outboundDate = getValueAndError(fields, 'outDate')[0];
  const outboundTime = getValueAndError(fields, 'outTime')[0];
  const checkinTime =  getValueAndError(fields, 'checkinTime')[0];
  const inboundFlightDate = setTimeForDate(inboundTime, inboundDate);
  const outboundFlightDate = setTimeForDate(outboundTime, outboundDate);
  const checkinDate = setTimeForDate(checkinTime, inboundDate);

  const payload = {
    personalDetails: {
      fullName: getValueAndError(fields, 'fullName')[0],
      address: getValueAndError(fields, 'address')[0],
      idNumber: getValueAndError(fields, 'idNumber')[0],
    },
    outbound: {
      location: getValueAndError(fields, 'outDest')[0],
      date: inboundFlightDate,
    },
    inbound: {
      location: getValueAndError(fields, 'inDest')[0],
      date: outboundFlightDate,
    },
    checkinDate
  };
  return payload;
};

const Form = props => {
  const dispatch = useDispatch();
  const onChange = (key, validators) => value => {
    const error = runValidators(value, validators);
    dispatch(setField({ key, value, error }));
  };
  const fields = useSelector(state => state.form && state.form.fields);
  const pending = useSelector(state => state.submit && state.submit.pending);
  pending && console.error(pending);

  const [outDestVal, outDestErr] = getValueAndError(fields, 'outDest');
  const [outDateVal, outDateErr] = getValueAndError(fields, 'outDate');
  const [outTimeVal, outTimeErr] = getValueAndError(fields, 'outTime');
  const [inDestVal, inDestErr] = getValueAndError(fields, 'inDest');
  const [inDateVal, inDateErr] = getValueAndError(fields, 'inDate');
  const [inTimeVal, inTimeErr] = getValueAndError(fields, 'inTime');
  const [
    checkinTimeVal, checkinTimeErr
  ] = getValueAndError(fields, 'checkinTime');

  const outDestValidators = [required];
  const outDateValidators = [required, dateAfter(new Date())];
  const outTimeValidators = [required];
  const inDestValidators = [required];
  const inDateValidators = [required, dateAfter(outDateVal)];
  const inTimeValidators = [required];
  const checkinTimeValidators = [required, timeAfter(addHours(outTimeVal, 1))];

  const done = () => {
    const fieldToValidator = {
      outDest: outDestValidators,
      outDate: outDateValidators,
      outTime: outTimeValidators,
      inDest: inDestValidators,
      inDate: inDateValidators,
      inTime: inTimeValidators,
      checkinTime: checkinTimeValidators,
    }
    const validated = Object.keys(fieldToValidator).reduce((acc, k, i) => {
      const value = fields[k] && fields[k].value;
      const error = runValidators(value, fieldToValidator[k]);
      if (error) return { ...acc, [k]: { value, error } }
      return acc;
    }, {});
    dispatch(setValidated(validated));
    if (!Object.keys(validated).length)
      dispatch(submitForm(formatPayload(fields)));
  }

  return (
    <View>
      <Text style={styles.groupHeaderText}>Outbound Flight</Text>
      <Input placeholder='Destination' leftIconName='location-arrow'
        value={outDestVal}
        errorMessage={outDestErr}
        onChangeText={onChange('outDest', outDestValidators)}
      />
      <DatePicker placeholder='Arrival Date' leftIconName='calendar'
        value={outDateVal}
        errorMessage={outDateErr}
        onConfirm={onChange('outDate', outDateValidators)}
      />
      <TimePicker placeholder='Arrival Time' leftIconName='clock-o'
        value={outTimeVal}
        errorMessage={outTimeErr}
        onConfirm={onChange('outTime', outTimeValidators)}
      />

      <Text style={styles.groupHeaderText}>Inbound Flight</Text>
      <Input placeholder='Destination' leftIconName='location-arrow'
        value={inDestVal}
        errorMessage={inDestErr}
        onChangeText={onChange('inDest', inDestValidators)}
      />
      <DatePicker placeholder='Departure Date' leftIconName='calendar'
        value={inDateVal}
        errorMessage={inDateErr}
        onConfirm={onChange('inDate', inDateValidators)}
      />
      <TimePicker placeholder='Departure Time' leftIconName='clock-o'
        value={inTimeVal}
        errorMessage={inTimeErr}
        onConfirm={onChange('inTime', inTimeValidators)}
      />

      <Text style={styles.groupHeaderText}>Check-in</Text>
      <TimePicker placeholder='Check-in Time' leftIconName='clock-o'
        value={checkinTimeVal}
        errorMessage={checkinTimeErr}
        onConfirm={onChange('checkinTime', checkinTimeValidators)}
      />
      <View style={{ marginHorizontal: 10, marginBottom: 24, marginVertical: 16 }}>
        <Button onPress={done} loading={pending}
        title="Done" buttonStyle={styles.buttonStyle} />
      </View>
    </View>

  )
}

const FlightDetails = props => (
  <KeyboardAwareScrollView style={styles.container}>
    <View style={styles.nextStepContainer}>
      <Text style={styles.nextStepText}>
        Great! Now tell us about your flights and preferred check-in time.
        </Text>
    </View>
    <Form navigation={props.navigation} />
  </KeyboardAwareScrollView>
);

FlightDetails.navigationOptions = {
  title: 'Flight Details'
};

export default FlightDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    color: Colors.text,
  },
  buttonStyle: {
    height: 64,
    backgroundColor: Colors.buttonPrimary,
    borderRadius: 64,
  },
  groupHeaderText: {
    marginVertical: 16,
    color: 'white',
    fontSize: 24,
    marginHorizontal: 10,
  },
  nextStepContainer: {
    marginVertical: 32,
  },
  nextStepText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: Colors.text,
    textAlign: 'center',
  },
});
