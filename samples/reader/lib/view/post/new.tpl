<!DOCTYPE html>
<html>
<head>
  <title>Create a post</title>
</head>
<body>
  <form action="/posts" method="POST">
    <legend>New Post</legend>
    <fieldset>
      {% include "./_post.tpl" %}
      <button type="submit">Submit</button>
    </fieldset>
  </form>
</body>
</html>
