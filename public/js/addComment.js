const commentHandler = async (event) => {
  event.preventDefault();

  //get user input
  const content = document.querySelector('#comment-input').value.trim();
  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  //Post comment to db
  if (content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ content, postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Request Failed');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentHandler);
