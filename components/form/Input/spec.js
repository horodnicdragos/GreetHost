import React from 'react';
import { shallow } from 'enzyme';

import Input from './Input';

describe('Input', () => {
    describe('without props', () => {
        it(`should render`, () => {
            const input = shallow(<Input />);
            expect(input.length).toBe(1);
        });
    });

    describe('with props', () => {
        const props = {
            placeholder: 'Test',
            leftIconName: 'calendar',
        };

        beforeEach(() => {
            wrapper = shallow(<Input {...props} />);
        });

        it(`should render`, () => {
            const input = wrapper;
            expect(input.length).toBe(1);
        });
        
        it(`should render the passed leftIcon`, () => {
            const Icon = wrapper.prop('leftIcon');
            const iconName = Icon.props.name;
            expect(iconName).toBe(props.leftIconName);
        });
    })
});
