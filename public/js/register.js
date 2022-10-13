const regFormHandler = async (event) => {
  event.preventDefault();

  //Get user input for registering
  const username = document.querySelector('#usernameRegInput').value.trim();
  const password = document.querySelector('#passwordRegInput').value.trim();

  //Post new user to the database
  if (username && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to register, password must be at least 6 characters long!');
    }
  }
};

document
  .querySelector('#registerForm')
  .addEventListener('submit', regFormHandler);
