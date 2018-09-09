import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import Form from '../Form';

const formData={
    username: '',
    email: '',
    password: '',
}

test('Register Form renders properly',()=>{
    const component = <Form formType={'Register'} formData={formData}/>;
    const wrapper = shallow(component);
    const h1 = wrapper.find('h1');
    expect(h1.length).toBe(1);
    expect(h1.get(0).props.children).toBe('Register');
    const formGroup = wrapper.find('.field');
    expect(formGroup.length).toBe(3);
    expect(formGroup.get(0).props.children.props.name).toBe('username');
    expect(formGroup.get(0).props.children.props.value).toBe('');
})

test('Login Form renders properly',()=>{
    
})