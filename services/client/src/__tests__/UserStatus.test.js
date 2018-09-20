import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import UserStatus from "../components/UserStatus";
import {MemoryRouter as Router} from 'react-router-dom';

const authenticatedList = [true, false];

beforeAll(()=>{
  global.localStorage={
    getItem:()=>'someToken',
  };
});
authenticatedList.forEach((auth)=>{
    test(` render properly when auth is ${String(auth)}`, () => {
        const wrapper = shallow(<UserStatus isAuthenticated={auth}/>);
      });
      
})

test("UsersList renders a snapshot properly", () => {
  const tree = renderer.create(<Router><UserStatus isAuthenticated={true}/></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
