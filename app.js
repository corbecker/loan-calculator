document.querySelector(".loan-form").addEventListener("submit", function(e){
  console.log('yas');
  
  e.preventDefault();
  const results = document.querySelector('#results');
  results.style.display = 'none';
  const loader = document.querySelector('#loading');
  loader.style.display = 'block';

  setTimeout(function(){
    
    calculateResults();
    loader.style.display = 'none';
    
  }, 2000)
});

function calculateResults() {

  const amountEl = document.querySelector("#amount");
  const interestEl = document.querySelector("#interest");
  const yearsEl = document.querySelector("#years");
  const monthlyPaymentEl = document.querySelector("#monthly-payment");
  const totalPaymentEl = document.querySelector("#total-payment");
  const totalInterestEl = document.querySelector("#total-interest");

  // Total loan value
  const principal = parseFloat(amountEl.value);
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  const calcPayments = parseFloat(years.value) * 12;

  // Monthlys
  const x = Math.pow(1 + calcInterest, calcPayments);
  const monthly = (principal * x * calcInterest) / (x - 1); //monthly payment

  //if an actual number is calculted display results if not display an error
  if(isFinite(monthly)){
    monthlyPaymentEl.value = monthly.toFixed(2);//display monthly payment to 2 decimal places
    totalPaymentEl.value = (monthly * calcPayments).toFixed(2);
    totalInterestEl.value = ((monthly * calcPayments) - principal).toFixed(2);
    document.querySelector('#results').style.display = 'block';
    
  }else{
    showError("Check inputted values.");
  }
  
}

function showError(error){
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  //clear after 3 seconds
  setTimeout(clearError, 3000, errorDiv);

}

function clearError(error){
  error.remove();
}