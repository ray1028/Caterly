$(document).ready(function() {
  console.log(localStorage.getItem("cart"))

    let data = JSON.parse(localStorage.getItem("cart"));
    let total = 0;

    for(let ele of data){
      $('.checkout-list-container').append(
        `<article class="checkout-list">
          <div class="checkout-list-item">
            <div><span>${ele.quantity}</span> x ${ele.name}</div>
            <div>$${calculateTotal(ele)}</div>
            <br>
          </div>
          <div>${ele.description}</div>
        </article>
        </br>`
      )

      total += parseFloat(calculateTotal(ele));
    }

    $('#checkout-total').append(
      `$${total.toFixed(2)}`
    );

    $('#checkout-final-total').append(
      `$${(total + total * .13).toFixed(2)}`
    );

})

const calculateTotal = (item) => {
  return Number(item.price * item.quantity).toFixed(2);
}

