{% extends "../layout/default" %}

{% block body %}
<form action="/login" method="POST">
  <input type="text" name="name">
  <input type="password" name="password">
  <button type="submit">Login</button>
</form>
{% endblock %}
