const regFormHandler = async (e) => {
  e.preventDefault();
  const username = document.querySelector("#usernameRegInput").value.trim();
  const password = document.querySelector("#passwordRegInput").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to register!");
    }
  }
};

document
  .querySelector("#registerForm")
  .addEventListener("submit", regFormHandler);
