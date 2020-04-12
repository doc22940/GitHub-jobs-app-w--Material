import React from "react";
import { mount } from "enzyme";
import App from "./";
import Header from "../Header";
import JobList from "../JobList";

describe("App", () => {
  it("should renders Header", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Header).length).toEqual(1);
  });

  it("should renders JobList", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(JobList).length).toEqual(1);
  });
});
