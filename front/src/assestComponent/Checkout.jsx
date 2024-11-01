import React, { useEffect } from 'react';

function Checkout() {
  const amount = '10.00'; // Adjust this to your total amount

  const handlePayPalSuccess = async (details) => {
    alert('Transaction completed by ' + details.payer.name.given_name);
    console.log('Transaction details:', details);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=AYnzVEObmnyuNDN4FBPKSqinCbKh7UwO3m5qeUkH6R6wknTw0ECuqp63tmy714ZzsyutrUTHELbmbD9W&currency=USD";
    script.async = true;
    script.onload = () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
              },
            }],
          });
        },
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          handlePayPalSuccess(details);
        },
        onError: (err) => {
          console.error('PayPal Checkout onError', err);
          alert('An error occurred with your payment. Please try again. Error: ' + err.message);
        },
      }).render('#paypal-button-container');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div className="font-[sans-serif] lg:flex lg:items-center lg:justify-center lg:h-screen max-lg:py-4">
        <div className="p-8 w-full max-w-5xl max-lg:max-w-xl mx-auto rounded-md border-2">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">Checkout</h2>
          <div className="mt-8">
            <div id="paypal-button-container" className="my-4"></div>
            <p className="text-center">Total Amount: ${amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
