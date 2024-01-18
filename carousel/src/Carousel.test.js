import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", () => {
  render(<Carousel photos={TEST_IMAGES}
    title="images for testing"/>);
});

//Will fail because it shows original snapshot of carousel code prior to bug fixing. Displays fixes!
it("matches snapshot", function() {
  const {asFragment} = render(<Carousel photos={TEST_IMAGES} title="images for testing"/>)

  expect(asFragment()).toMatchSnapshot()
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});


it("Works when you click on the left arrow", function() {
  const { container } = render(<Carousel photos={TEST_IMAGES} title="images for testing"/>);

  //Must start on number > img 1 out of 3
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the first image to show, but not the third
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();

    // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  expect(
    container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
})

it("If on first img of TEST_IMAGES array left arrow won't show", function() {
  const { container } = render(<Carousel photos={TEST_IMAGES} title="images for testing"/>);

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument()

  expect(container.querySelector(".bi-arrow-left-circle")).toBeInTheDocument();

  expect(rightArrow).toBeInTheDocument();

  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);
  // expect first img to show but, with left arrow hidden
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(leftArrow).toHaveClass('hidden')
})

it("If on last img of TEST_IMAGES array right arrow won't show", function() {
  const { container } = render(<Carousel photos={TEST_IMAGES} title="images for testing"/>);

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  //Get us to img 2
  fireEvent.click(rightArrow);
  const leftArrow = container.querySelector(".bi-arrow-left-circle");

  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument()
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();

  
  //Click to show img 3. The right arrow should be hidden if img 3 displayed
  fireEvent.click(rightArrow)

  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
  expect(rightArrow).toHaveClass('hidden');
})