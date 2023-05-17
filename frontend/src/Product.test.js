import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { shallow, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, screen } from '@testing-library/react';
import Products from "./Products";
import App from "./App";

configure({adapter: new Adapter()});

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Render Products component", () => {
  
  const mockGetDate = jest.fn().mockReturnValue('2022-01-21');
  const robotsData = [
    {
      name:"Marion Hauck",
      image:"https://robohash.org/Marion Hauck.png?size=120x120",
      price:"274.90",
      stock:3,
      createdAt:"2022-01-21T20:57:18.968Z",
      material:"Granite"
    },
    {
      name:"Manley Howell",
      image:"https://robohash.org/Manley Howell.png?size=120x120",
      price:"710.04",
      stock:5,
      createdAt:"2021-12-30T07:16:28.492Z",
      material:"Granite"
    },
    {
      name:"Mary McGlynn",
      image:"https://robohash.org/Mary McGlynn.png?size=120x120",
      price:"789.56","stock":1,
      stock:6,
      createdAt:"2021-09-11T06:34:28.035Z",
      material:"Wooden"
    },
    {
      name:"Trevion Marks",
      image:"https://robohash.org/Trevion Marks.png?size=120x120",
      price:"278.17",
      stock:7,
      createdAt:"2021-07-20T10:24:02.912Z",
      material:"Fresh"
    }
  ];
  
  it("accepts robots data props", () => {
    const wrapper = shallow(<Products robotsData={robotsData} getDate={mockGetDate} />);
    expect(wrapper.text()).toMatch('Marion HauckPrice : In Stock :3Creation Date :2022-01-21Material :GraniteAdd to CartManley HowellPrice : In Stock :5Creation Date :2022-01-21Material :GraniteAdd to CartMary McGlynnPrice : In Stock :6Creation Date :2022-01-21Material :WoodenAdd to CartTrevion MarksPrice : In Stock :7Creation Date :2022-01-21Material :FreshAdd to Cart');
  });

  it("contains product name", () => {
    const wrapper = shallow(<Products robotsData={robotsData} getDate={mockGetDate} />);
    const value = wrapper.find("#product_name").get(0).props.children;
    expect(value).toEqual('Marion Hauck');
  });

  it("contains product image", () => {
    const wrapper = shallow(<Products robotsData={robotsData} getDate={mockGetDate} />);
    const value = wrapper.find("#product_img").get(0).props.src;
    expect(value).toEqual("https://robohash.org/Marion Hauck.png?size=120x120");
  });

  it("contains product creation date", () => {
    const wrapper = shallow(<Products robotsData={robotsData} getDate={mockGetDate} />);
    const value = mockGetDate(wrapper.find("#product_creation_date").get(0).props.children);
    expect(mockGetDate(value)).toEqual('2022-01-21');
  });

  it("contains product material", () => {
    const wrapper = shallow(<Products robotsData={robotsData} getDate={mockGetDate} />);
    const value = wrapper.find("#product_material").get(0).props.children[1];
    expect(value).toEqual('Granite');
  });

  it("contains product stock", () => {
    const wrapper = shallow(<Products robotsData={robotsData} getDate={mockGetDate} />);
    const value = wrapper.find("#product_stock").get(0).props.children[1];
    expect(value).toEqual(3);
  });

  it("contains product price", () => {
    const wrapper = shallow(<Products robotsData={robotsData} getDate={mockGetDate} />);
    const value = wrapper.props().children[1].props.children.props.children[1].props.children[1].props.children.props.children[1].props.value;
    expect(value).toEqual('710.04');
  });

  it("contains product price", () => {
    const wrapper = shallow(<Products robotsData={robotsData} getDate={mockGetDate} />);
    debugger
    const value = wrapper.find("#add_to_cart").simulate("click", { target: {value:"2022-01-21T20:57:18.968Z"}})
    expect(value).toBeCalled();
  });

  it("It should call getDate and return right date",() => {
    debugger
    console.log(screen, "kkkkk")
    const wrapper = shallow(<App/>)
    const getMockDate = jest.spyOn(App.getDate, 'getDate')
    const result = greeter.getDate("2022-01-21T20:57:18.968Z");
  
    expect(getMockDate).toHaveBeenCalled();
    expect(result).toBe("2022-01-21");
    expect(getMockDate).toHaveBeenCalledWith("2022-01-21T20:57:18.968Z");
  })

});