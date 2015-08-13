<html>
<head>
  <title>Reader app</title>
</head>
<body>

  <ul>
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
  </ul>

  <table>
    <tr>
    {% for post in posts %}
      <td>{{post.title}}</td>
      <td>{{post.createdAt}}</td>
      <td>{{post.author.lastName}}</td>
    {% endfor %}
    </tr>
  </table>

</body>
</html>
