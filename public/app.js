function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
    // Use the full URL for the server
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }), // Send username and password as JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        // Securely redirect to the secured route
        window.location.href = `/redirect/${data.redirectToken}`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "block"; // Show error message on the page
      errorMessage.textContent = error.message;
    });
}
