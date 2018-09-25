import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import {MemoryRouter as Router} from 'react-router-dom';
import{registerFormRules,loginFormRules} from '../components/forms/form-rules'
import FormErrors from '../components/forms/FormErrors';

const registerFormProps={
    formType: 'Register',
    formRules: registerFormRules, 
}

const loginFormProps = {
    formType: 'Login',
    formRules: loginFormRules,
}

const formList =[
    registerFormProps, 
    loginFormProps
];
describe('Form Error test',()=>{
    formList.forEach((el)=>{
        test(`FormErrors (with ${el.formType} form) renders properly`,()=>{
            const wrapper = shallow(<FormErrors formRules={el.formRules}/>);
            const ul = wrapper.find('ul');
            expect(ul.length).toBe(1);
            const li = wrapper.find('li');
            expect(li.length).toBe(el.formRules.length);
            el.formRules.forEach((rule,idx)=>{
                expect(li.get(idx).props.children).toContain(
                    rule.name
                );
            })
        })
        
        test(`FormErrors (with ${el.formType} form) renders a snapshot properly`,()=>{
            const tree = renderer.create(
                <Router><FormErrors {...el.formRules}/></Router>
            ).toJSON();
            expect(tree).toMatchSnapshot(); 
        })
        
    })

})
