$(document).ready(function() {
  console.log(localStorage.getItem("cart"))

    let data = JSON.parse(localStorage.getItem("cart"));
    let total = 0;

    if(data){
      for(let ele of data){
        $('#restaurant-checkout-items').append(
          `<article class="checkout-list">
            <div class="checkout-list-item">
              <div><span>${ele.quantity}</span> x ${ele.name}</div>
              <div>$${ele.price}</div>
              <br>
            </div>
            <div>${ele.description}</div>
          </article>
          </br>`
        )
      }

      let total = calculateTotalForCheckout(data);
      total = total.toFixed(2);
      let tax = (total * 0.13).toFixed(2);
      let totAfterTax = Number(total) + Number(tax);
      totAfterTax = totAfterTax.toFixed(2)

      $(".restaurant-checkout-cart-subtotal-box").html(total);
      $(".restaurant-checkout-cart-tax-box").html(tax);
      $(".restaurant-checkout-cart-total-box").html(totAfterTax);

    }
})

const calculateTotalForCheckout = dataObj => {
  let total = 0;
  dataObj.forEach(item => {
    total+= item.quantity * Number(item.price);
  })
  return total;
};


