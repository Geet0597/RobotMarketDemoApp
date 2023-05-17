import * as React from "react";
import * as CurrencyFormat from 'react-currency-format';
// import './styles/ShoppingCart.css';

const ShoppingCart = ({cartItems, setCartItems, productCount, setProductCount}) => {
  // Function to remove a particular cart item
  const removeCartItem = (data) => {
    const remainingItem =  cartItems.filter(cartItem => cartItem.createdAt !== data.createdAt);
    const remainingCount = productCount.filter(count => count.createdAt !== data.createdAt);
    setCartItems(remainingItem);
    setProductCount(remainingCount);
  }
  // Function to get total cart items count
  const getProductCount = (data) => {
    const value = productCount?.filter(count => (count.createdAt === data));
    return value;
  }

  // Function to get total amount of cart items
  const totalAmount = () => {
    let total = 0;
    productCount.map(count => total =  total + count.price*count.count);
    return total.toFixed(2);
  }

  // Function to get total cart items count
  const totalItems = () => {
    let totalItems = 0;
    productCount.map(count => totalItems =  totalItems + count.count);
    return totalItems;
  }

  return (
    <div className="cart-container">
      <div className="header pt-4">
        <h3 className="heading">Shopping Cart</h3>
        <h5 className="action" 
          onClick={() => {
            setCartItems([]);
            setProductCount([]);
          }}
        >Remove all</h5>
      </div>
      {cartItems.length > 0 ? 
        <>
          {cartItems.map((cartItem, index) => 
            <div className="cart-items" key={index}>
              <div className="image-box">
              <img src={cartItem.image} style={{ width:"100%" }} />
              </div>
              <div className="about">
              <h1 className="title">{cartItem.name}</h1>
              <h3 className="subtitle">{cartItem.stock}</h3>
              </div>
              <div className="counter">
                <button className="buttons"
                  onClick={() => {
                    if(productCount.length > 0){
                      const index  = productCount.findIndex(count => count.createdAt === cartItem.createdAt);
                      if(productCount[index].count < cartItem.stock){
                        if(productCount[index].count < cartItem.stock) {
                          const totalCount = productCount[index].count + 1 ;
                          productCount[index].createdAt = cartItem.createdAt;
                          productCount[index].count = totalCount;
                          productCount[index].price = cartItem.price;
                        }
                        setProductCount(productCount.flat());
                      }
                    }
                  }
                }
                >+</button>
                <div className="count" id={cartItem.createdAt}>
                  {getProductCount(cartItem.createdAt).map(count => 
                    (count.createdAt === cartItem.createdAt) ? count.count : 1)}
                </div>
                <button className="buttons"
                  onClick={() => {
                    if(productCount.length > 0){
                      const index = productCount.findIndex(count => count.createdAt === cartItem.createdAt);
                      if(productCount[index].count <= cartItem.stock && productCount[index].count > 1){
                        if(productCount[index].count < cartItem.stock) {
                          const totalCount = productCount[index].count-1;
                          productCount[index].createdAt = cartItem.createdAt;
                          productCount[index].count = totalCount;
                          productCount[index].price = cartItem.price;
                        }
                        setProductCount(productCount.flat());
                      }
                    }
                  }
                }
                >-</button>
              </div>
              <div className="prices">
                <div className="amount">
                  <CurrencyFormat 
                    value={cartItem.price}
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'฿'} 
                    renderText={value => 
                      <div>{value}</div>
                    }
                  />
                </div>
                <div className="remove" onClick={() => removeCartItem(cartItem)}><u>Remove</u></div>
              </div>
            </div>
          )}
        </> : 
        <div className="cart-items">
          <div className="mx-auto my-5">
            <h4>No Items Added Yet</h4>
          </div>
        </div>
      }
      <hr/>
      <div className="checkout">
        <div className="total">
        <div>
        <div className="subtotal">Sub-Total</div>
        <div className="items">{totalItems()} items</div>
        </div>
        <div className="total-amount">
          <CurrencyFormat 
            value={totalAmount()} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'฿'} 
            renderText={value =>
              <div>{value}</div>
            }
          />
        </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
