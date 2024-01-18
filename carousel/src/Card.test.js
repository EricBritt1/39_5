import { render, fireEvent } from "@testing-library/react";
import Card from './Card.js'
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function() {
    render(<Card caption="test1" src="test1.com" currNum={1} totalNum={3}/>)
})

it("matches snapshot", function () {
    const {asFragment} = render(<Card caption="test1" src="test1.com" currNum={1} totalNum={3}/>)
    expect(asFragment()).toMatchSnapshot();
})