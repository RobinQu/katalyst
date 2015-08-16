<html>
<head>
  <title>Reader app</title>
</head>
<body>
  <ul>
    {% if(user) %}
    <li>Hi, {{user.name}}</li>
    <li><a href="/logout">Logout</a></li>
    {% else %}
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
    {% endif %}
  </ul>

  {% if posts.length %}
  <a href="/posts/new">Add post</a>
  <table>

    {% for post in posts %}
      <tr>
        <td>{{post.title}}</td>
        <td>{{post.createdAt}}</td>
        <td>{{post.author.lastName}}</td>
      </tr>
    {% endfor %}

  </table>
  {% else %}
  <p>No posts here. Login and <a href="/posts/new">write one</a>!</p>
  {% endif %}

</body>
</html>
