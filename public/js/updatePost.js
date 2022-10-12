const updatePostHandler = async () => {
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const content = document.querySelector('#content-input').value.trim();
  const title = document.querySelector('#title-input').value.trim();

  if (title && content) {
    var response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
  } else if (title && !content) {
    var response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json' },
    });
  } else if (!title && content) {
    var response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update.');
  }
};

document
  .querySelector('#update-post')
  .addEventListener('click', updatePostHandler);
