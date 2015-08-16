<html>
<head>
  <title>Reader app</title>
  {% block meta %}
  {% endblock %}
</head>
<body>
  <nav>
    <ul>
      {% if(user) %}
      <li>Hi, {{user.name}}</li>
      <li><a href="/logout">Logout</a></li>
      {% else %}
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
      {% endif %}
    </ul>
  </nav>

  {% block body %}
  {% endblock %}

</body>
</html>
