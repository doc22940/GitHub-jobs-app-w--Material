import React from "react";
import renderer from "react-test-renderer";

import SearchForm from "./";

describe("SearchForm", () => {
  test("snapshot renders", () => {
    const handleSubmit = jest.fn();
    const component = renderer.create(
      <SearchForm handleSubmit={handleSubmit} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
