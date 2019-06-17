import React from 'react';
import { shallow } from 'enzyme';
import DateTimePickerInput from './DateTimePickerInput';
import {findByTestID} from '../../../utils/testUtils';

describe('DateTimePicker', () => {
    beforeEach(() => {
        wrapper = shallow(<DateTimePickerInput/>);
    });

    it(`should render`, () => {
        expect(wrapper.length).toBe(1);
    });

    it(`should show picker after pressing input`, () => {
        const inputWrapper = findByTestID(wrapper, 'inputWrapper');
        inputWrapper.props().onPress();
        wrapper.update();
        const picker = findByTestID(wrapper, 'picker')
        expect(picker.prop('isVisible')).toBe(true);
    });

});
