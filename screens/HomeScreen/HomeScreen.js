import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'

import Input from '../../components/form/Input';
import Colors from '../../constants/Colors';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import { setField, setValidated } from '../../redux/form/actions';
import { 
  required, 
  onlyLetters, 
  runValidators,
  getValueAndError,
} from '../../utils/formValidation'

const timeOfDayGreeting = () => {
  const now = new Date();
  const hours = now.getHours();
  if (hours > 5 && hours <= 12) return 'Good morning!';
  if (hours > 12 && hours <= 18) return 'Good afternoon!';
  if (hours > 18 || hours < 5) return 'Good evening!';
}
const welcomeMessage = `Are you ready to be our guest? \
Let's start by filling in your personal data so we can greet you in the best \
possible way.`;



const HomeScreen = props => {
  const dispatch = useDispatch();
  const onChange = (key, validators) => value => {
    const error = runValidators(value, validators);
    dispatch(setField({ key, value, error }));
  };
  const fields = useSelector(state => state.form && state.form.fields);

  const nameValidators = [required, onlyLetters];
  const addressValidators = idNumberValidators = [required];

  const [nameVal, nameErr] = getValueAndError(fields, 'name');
  const [addressVal, addressErr] = getValueAndError(fields, 'address');
  const [idNumberVal, idNumberErr] = getValueAndError(fields, 'idNumber');

  const next = () => {
    const fieldToValidator = {
      name: nameValidators,
      address: addressValidators,
      idNumber: idNumberValidators
    }
    const validated = Object.keys(fieldToValidator).reduce((acc, k, i) => {
      const value = fields[k] && fields[k].value;
      const error = runValidators(value, fieldToValidator[k]);
      if (error) return {...acc, [k]: {value, error}}
      return acc;
    }, {});
    dispatch(setValidated(validated));
    if (!Object.keys(validated).length) 
      props.navigation.navigate('FlightDetails')
  }

  return (
    <DismissKeyboardView style={styles.container}>
      <Text style={styles.welcomeText}>
        {timeOfDayGreeting()}
      </Text>

      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>
          {welcomeMessage}
        </Text>
      </View>
      <View>
        <Input placeholder='Full Name' leftIconName='user'
          value={nameVal}
          errorMessage={nameErr}
          onChangeText={onChange('name', nameValidators)}
        />
        <Input placeholder='Address' leftIconName='home' 
          value={addressVal}
          errorMessage={addressErr}
          onChangeText={onChange('address', addressValidators)}
        />
        <Input placeholder='ID Number' leftIconName='id-card' 
          value={idNumberVal}
          errorMessage={idNumberErr}
          onChangeText={onChange('idNumber', idNumberValidators)}
        />
      </View>
      <View style={{ marginHorizontal: 10, marginBottom: 'auto' }}>
        <Button iconRight={true}
          icon={{ name: "chevron-right", size: 32, color: "white" }}
          onPress={next}
          title="Next" buttonStyle={styles.buttonStyle} />
      </View>
    </DismissKeyboardView>
  );
}

export default HomeScreen

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    color: '#fff'
  },
  buttonStyle: {
    height: 64,
    backgroundColor: Colors.buttonPrimary,
    borderRadius: 64,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 40,
    marginVertical: 48,
    color: '#fff',
  },
  getStartedContainer: {
    marginVertical: 32,
  },
  getStartedText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#fff',
    textAlign: 'center',
  },
});
