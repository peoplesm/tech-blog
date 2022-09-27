const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#titleInput").value.trim();
  const content = document.querySelector("#contentInput").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create new post!");
    }
  }
};
document
  .querySelector("#newPostForm")
  .addEventListener("submit", newPostHandler);
