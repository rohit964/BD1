const express = require('express');
const cors = require("cors");
const { resolve } = require('path');

const app = express();
const port = 3000;
app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate =2;

// Endpoint 1: Calculate the total price of items in the cart
function totalPrice(newItemPrice, cartTotal){
  return newItemPrice + cartTotal;
}
app.get('/cart-total', (req, res)=>{
  let newItemPrice = +req.query.newItemPrice;
  let cartTotal = +req.query.cartTotal;
  res.send(totalPrice(newItemPrice,cartTotal).toString());
})

//Endpoint 2 : Apply a discount based on membership status
app.get('/membership-discount', (req, res)=>{
  let cartTotal = +req.query.cartTotal;
  let isMember = req.query.isMember;
  let ans;
  if(isMember){
    ans = cartTotal - (discountPercentage * cartTotal / 100);
  }else{
    ans = cartTotal;
  }
  res.send(ans.toString());
})

//Endpoint 3 : Calculate tax on the cart total
app.get('/calculate-tax', (req, res)=>{
  let cartTotal = +req.query.cartTotal;
  let tax = cartTotal * taxRate /100;
  res.send(tax.toString());
})

//Endpoint 4 : Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res)=>{
  let shippingMethod = req.query.shippingMethod;
  let distance = +req.query.distance;
  let deliveryDays;
  if(shippingMethod == "standard"){
    deliveryDays = distance / 50;
  }else{
    deliveryDays = distance / 100;
  }
  res.send(deliveryDays.toString());
})

//Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res)=>{
  let weight = +req.query.weight;
  let distance = +req.query.distance;
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
})

//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res)=>{
  let purchaseAmount = +req.query.purchaseAmount;
  let loyaltyPoint = purchaseAmount * 2;
  res.send(loyaltyPoint.toString());
})















app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
