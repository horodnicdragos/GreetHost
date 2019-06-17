import React from 'react';
import { shallow } from 'enzyme';
import DatePicker, {overwriteProps} from './DatePicker';
import DateTimePicker from '../DateTimePicker';

describe('DatePicker', () => {
    describe('without props', () => {
        beforeEach(() => {
            wrapper = shallow(<DatePicker/>);
        });

        it(`should render a DateTimePicker`, () => {
            expect(wrapper.matchesElement(<DateTimePicker/>)).toBe(true);
        });

        it(`should pass date mode to DateTimePicker`, () => {
            const mode = wrapper.prop('pickerProps').mode;
            expect(mode).toBe('date');
        });
    });

    describe('with props', () => {
        const props = {
            placeholder: 'Test',
            leftIconName: 'calendar',
            pickerProps: { test: 'value'}
        };
        beforeEach(() => {
            wrapper = shallow(<DatePicker {...props} />);
        });

        it(`should render a DateTimePicker`, () => {
            expect(wrapper.matchesElement(<DateTimePicker/>)).toBe(true);
        });
        
        it(`should separate input props`, () => {
            const passedInputProps = wrapper.prop('inputProps');
            const {pickerProps, ...inputProps} = props;
            expect(passedInputProps).toEqual(inputProps);
        });

        it(`should separate and merge picker props`, () => {
            const passedPickerProps = wrapper.prop('pickerProps');
            const mergedPickerProps = {...props.pickerProps, ...overwriteProps};
            expect(passedPickerProps).toEqual(mergedPickerProps);
        });
    })
});
