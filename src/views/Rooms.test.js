import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Rooms from "./Rooms";
import request from "superagent";

configure({ adapter: new Adapter() });

jest.mock("superagent");

describe("Rooms component", () => {
  describe("when rendered", () => {
    it("should fetch a list of rooms", () => {
      const getSpy = jest.spyOn(request, "get");
      // const spyDidMount = jest.spyOn(Rooms.prototype, "componentDidMount");
      const roomsInstance = shallow(<Rooms />);
      expect(getSpy).toHaveBeenCalled();
    });
  });
});
