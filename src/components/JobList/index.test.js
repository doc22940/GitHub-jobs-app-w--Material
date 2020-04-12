import React from "react";
import { shallow } from "enzyme";
import JobList from "./";
import ErrorSnackBar from "./ErrorSnackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";

describe("JobList", () => {
  it("should load ErrorSnackBar", () => {
    const wrapper = shallow(
      <JobList positions={[]} isError={true} isLoading={true} />
    );
    expect(wrapper.find(ErrorSnackBar).length).toEqual(1);
  });

  it("should load CircularProgress", () => {
    const wrapper = shallow(
      <JobList positions={[]} isError={false} isLoading={true} />
    );
    expect(wrapper.find(CircularProgress).length).toEqual(1);
  });

  it("should load List", () => {
    const positions = [
      {
        id: "46d4783d-6032-4e47-a485-336b2c6d2a35",
        created_at: "Sat Apr 11 16:30:39 UTC 2020",
        company: "Signature Creative Inc.",
        location: "Los Angeles",
        title: "Wordpress Developer"
      },
      {
        id: "31e45250-1575-4e94-ab3e-1eef6a53990d",
        created_at: "Sat Apr 11 07:35:22 UTC 2020",
        company: "FlatWorld.co",
        location: "Remote: GMT+3 to GMT-5",
        title: "[REMOTE] Sr. Fullstack React + Node"
      }
    ];

    const wrapper = shallow(
      <JobList positions={positions} isError={false} isLoading={false} />
    );
    expect(wrapper.find(List).length).toEqual(1);
  });
});
