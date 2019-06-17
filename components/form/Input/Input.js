import React from 'react';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../../constants/Colors';

export default props => {
    const defaults = {
        ...defaultStylesProps,
        leftIcon: props.leftIconName ?
            <Icon name={props.leftIconName} size={24} color={Colors.text} />
            : null
    };
    const mergedProps = { ...defaults, ...props };
    return <Input {...mergedProps} />;
}

const defaultStylesProps = {
    containerStyle: {
        height: 80,
        justifyContent: 'flex-start',
    },
    leftIconContainerStyle: {
        width: 40,
    },
    errorStyle: { 
        color: Colors.error,
    },
    inputStyle: {
        color: Colors.text,
        height: 56,
    },
    inputContainerStyle: {
        borderRadius: 56,
        borderWidth: 1,
        height: 56,
        borderColor: Colors.text
    },
    placeholderTextColor: Colors.transparentWhite
};
