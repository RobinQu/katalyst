<!DOCTYPE html>
<html>
<head>
  <title>Update a post</title>
</head>
<body>
  <form action="/posts/{{post.id}}/update" method="POST">
    <legend>Edit Post</legend>
    <fieldset>
      {% include "./_post.tpl" %}
      <button type="submit">Submit</button>
    </fieldset>
  </form>
</body>
</html>
