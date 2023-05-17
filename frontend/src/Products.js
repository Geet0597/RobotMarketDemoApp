import * as React from "react";
import * as CurrencyFormat from 'react-currency-format';

const Products = (props) => {
  const {robotsData, getDate, cartItems, setCartItems, setProductCount, productCount} = props;
  // Function to add items to cart
  const addToCartFunc = (e, data) => {
    if(e.target.value === data.createdAt) {
      const isProductPresent = cartItems.length > 0 && cartItems.find(cartItem => (cartItem.createdAt === data.createdAt));
      if(isProductPresent) {
          if(productCount.length > 0){
            const index  = productCount.findIndex(count => count.createdAt === data.createdAt);
            if(productCount[index].count < data.stock) {
              const totalCount = productCount[index].count + 1 ;
              productCount[index].createdAt = data.createdAt;
              productCount[index].count = totalCount;
              productCount[index].price = data.price;
            } else {
                if(cartItems.length === 5){
                  alert("You can't add more than 5 robots in cart")
                }
            }
            setProductCount(productCount.flat());
          }
      } else {
        const totalCount = 0 + 1 ;
        setCartItems([...cartItems, data]);
        setProductCount([...productCount, {
          "createdAt": data.createdAt,
          "count": totalCount,
          "price": data.price
        }]);
      }
    }
  }

  return (
    <div className="row">
      {robotsData.map((data, index) => 
        <div className="col-4 px-1" key={index}>
          <div className="card mb-4">
            <img className="card-img-top" id="product_img" src={data.image} alt="Card image cap" />
            <div className="card-body cardBodyHeight">
              <h5 className="card-title" id="product_name">{data.name}</h5>
              <div className="card-text">
                <span className="d-flex"> 
                  <h6 className="mt-1 rightSpacing">Price : </h6>
                  <CurrencyFormat 
                    id="#product_price"
                    value={data.price} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'฿'} 
                    renderText={value => 
                      <div>{value}</div>
                    }
                  />
                </span>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="d-flex" id="product_stock"> 
                  <h6 className="mt-1 rightSpacing">In Stock :</h6>
                  {data.stock}
                </span>
              </li>
              <li className="list-group-item">
                <span className="d-flex" id="product_creation_date"> 
                  <h6 className="mt-1 rightSpacing">Creation Date :</h6>
                  {getDate(data.createdAt)}
                </span>
              </li>
              <li className="list-group-item">
                <span className="d-flex" id="product_material" > 
                  <h6 className="mt-1 rightSpacing">Material :</h6>
                  {data.material}
                </span>
              </li>
            </ul>
            <div className="card-body">
              <button 
                id="#add_to_cart"
                className={data.stock === 0 ? "border-0 bg-muted text-grey p-2 rounded" : "border-0 bg-primary text-white p-2 rounded"}
                value={data.createdAt}
                disabled={data.stock === 0}
                onClick={e => addToCartFunc(e, data)}>
                  Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Products;