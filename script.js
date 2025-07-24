// Handle login logic
const loginForm = document.getElementById("loginForm");
const rechargeForm = document.getElementById("rechargeForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "developer" && password === "developer") {
      localStorage.setItem("loggedInUser", username);
      window.location.href = "recharge.html";
    } else {
      document.getElementById("error").textContent = "Invalid credentials!";
    }
  });
}

if (rechargeForm) {
  const nameInput = document.getElementById("rechargeName");
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    window.location.href = "index.html";
  } else {
    nameInput.value = user;
  }

  rechargeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = document.getElementById("amount").value;

    if (amount < 1) {
      alert("Amount must be at least ₹1");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
      amount: amount * 100,
      currency: "INR",
      name: "Recharge Site",
      description: "Recharge Payment",
      handler: function (response) {
        document.getElementById("success").textContent =
          "Payment successful! Payment ID: " + response.razorpay_payment_id;
      },
      prefill: {
        name: user
      },
      theme: {
        color: "#007bff"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });
}
