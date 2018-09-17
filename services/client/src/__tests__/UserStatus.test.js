import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import UserStatus from "../components/UserStatus";

const users = [
  {
    email: "hermanmu@gmail.com",
    id: 1,
    username: "michael"
  },
  {
    email: "michael@mherman.org",
    id: 2,
    username: "michaelherman"
  }
];

users.forEach((user)=>{
    test(`${user.username} render properly`, () => {
        const wrapper = shallow(<UserStatus />);
      });
      
})

test("UsersList renders a snapshot properly", () => {
  const tree = renderer.create(<UserStatus />).toJSON();
  expect(tree).toMatchSnapshot();
});
