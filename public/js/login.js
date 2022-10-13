const loginFormHandler = async (event) => {
  event.preventDefault();

  //Get user input
  const username = document.querySelector('#usernameInput').value.trim();
  const password = document.querySelector('#passwordInput').value.trim();

  //Post user login info to db
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

document
  .querySelector('#loginForm')
  .addEventListener('submit', loginFormHandler);
