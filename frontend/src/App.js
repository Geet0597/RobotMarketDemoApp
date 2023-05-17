import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ShoppingCart from "./ShoppingCart";
import Products from "./Products";

const App = () => {
  // Main states
  const [robotsData, setRobotsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [productCount, setProductCount] = useState([]);
  const [searchData, setSearchData] = useState('');

  useEffect(async() => {
    try {
      // Fetching data
      const response = await axios.get("http://localhost:8000/api/robots");
      if(response.status === 200){
        setRobotsData(response.data.data);
      }
    } catch (error) {
      alert(error);
    }
  },[]);

  // To get formatted date
  const getDate = (value) => {
    const date = new Date(value);
    return (date.getDate() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getFullYear());
  }

  return (
    <div className="App m-2">
      <div className="p-0 m-2">
        <div className="d-flex justify-content-center">
          <h1>Robot Market</h1>
        </div>
        <div>
          <h5>Filter by Robots's Material Type</h5>
          <input 
            id="search"
            value={searchData}
            placeholder="Search" 
            onChange={(e) => {
              setSearchData(e.target.value);
              const filteredData = robotsData.filter(data => 
                data.material.includes(e.target.value)
              )
              setRobotsData(filteredData);
            }
            } />
        </div>
        <div className="row mt-3 column-design">
          <div className="col-8 mt-3">
            <Products 
              cartItems={cartItems} 
              robotsData={robotsData} 
              getDate={getDate} 
              setCartItems={setCartItems}
              productCount={productCount}
              setProductCount={setProductCount}
            />
          </div>
          <div className="col-4 mt-3">
            <ShoppingCart 
              cartItems={cartItems} 
              setCartItems={setCartItems} 
              productCount={productCount}
              setProductCount={setProductCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
