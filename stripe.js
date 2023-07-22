// Set your publishable API key
var stripe = Stripe('your_publishable_key_here');

// Create a reference to the form and submit button
var form = document.getElementById('payment-form');
var submitButton = document.getElementById('submit-payment');

// Handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Disable the submit button to prevent multiple submissions
  submitButton.disabled = true;

  // Create a payment token using the customer's card details
  stripe.createToken('card', {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    number: document.getElementById('card-number').value,
    exp_month: document.getElementById('expiration-date').value.slice(0,2),
    exp_year: '20' + document.getElementById('expiration-date').value.slice(3,5),
    cvc: document.getElementById('cvc').value
  }).then(function(result) {
    // If payment tokenization is successful, add the token to the form data and submit the form
    if (result.token) {
      var tokenInput = document.createElement('input');
      tokenInput.setAttribute('type', 'hidden');
      tokenInput.setAttribute('name', 'stripeToken');
      tokenInput.setAttribute('value', result.token.id);
      form.appendChild(tokenInput);
      form.submit();
    } else {
      // If payment tokenization fails, re-enable the submit button and display an error message
      submitButton.disabled = false;
      alert(result.error.message);
    }
  });
});
