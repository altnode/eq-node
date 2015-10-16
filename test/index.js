import assert from "power-assert";
import index from "../src";
import EQNode from "../src/EQNode";

describe("index", () => {
  it("exports", () => {
    assert(index === EQNode);
  });
});
