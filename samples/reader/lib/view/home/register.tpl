{% extends "../layout/default" %}

{% block body %}
<form action="/register" method="POST">
  <legend>Register</legend>
  <fieldset>
    <input type="text" name="name">
    <input type="password" name="password">
    <input type="password" name="repeatPassword">
    <button type="submit">Register</button>
  </fieldset>
</form>
{% endblock %}
