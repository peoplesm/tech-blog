const deletePostHandler = async () => {
  //get post's id
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  //delete post from db based on id
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete.');
  }
};

document
  .querySelector('#delete-post')
  .addEventListener('click', deletePostHandler);
