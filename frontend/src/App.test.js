import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {shallow, configure } from 'enzyme';
import axios from "axios";
import App from "./App";

jest.mock("axios");
let container = null;
let wrapper;
let useEffect;

const data = [
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

const mockUseEffect = () => {
  useEffect.mockImplementationOnce(f => f());
};

beforeEach(() => {
  // setup a DOM element as a render target
  useEffect = jest.spyOn(React, "useEffect");
  mockUseEffect();
  mockUseEffect();
  wrapper = shallow(<App />);
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

configure({adapter: new Adapter()});

describe('Input value', () => {
  // jest.mock('./ShoppingCart')
  // jest.mock('./Products')
 
  it('should render text',()=> {
    const wrapper = shallow(<App/>)
    expect(wrapper.find('h1')).toBeTruthy()
  });

  it('updates on change', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.find("search")).toBeTruthy();
    wrapper.find('#search').simulate("change",{ target: {value: "searched product"}});
    expect(wrapper.find('#search').get(0).props.value).toEqual("searched product");
    wrapper.find('#search').simulate("change",{ target: {value: "second searched product"}});
    debugger
    expect(wrapper.find('#search').getElement().props.value).toEqual("second searched product");
  });
 
  // const setState = jest.fn();
  // const useStateSpy = jest.spyOn(React, 'useState');
  // useStateSpy.mockImplementation(initialState => [initialState, setState]);

  test("returns robot data", async () => {
    expect(mockUseEffect).toBeTruthy();
    // mock axios promise
    await act(async () => {
      await axios.get.mockImplementationOnce(() => Promise.resolve(data));
      wrapper = shallow(<App />);
    });

    // check the render output
    wrapper.update();
    await axios.mockResolvedValue();

    // expect(axios).toBeCalled()})
});

describe("App", () => {
  test("should fetch data on mount", () => {
    let component;
    act(() => {
      component = shallow(<App />);
    });
    expect(component.text()).toBe("Robot MarketFilter by Robots's Material Type<Products /><ShoppingCart />");
  })
});
})