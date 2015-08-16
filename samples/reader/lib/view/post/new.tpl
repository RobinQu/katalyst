{% extends "../layout/default" %}

{% block body %}
<form action="/posts" method="POST">
  <legend>New Post</legend>
  <fieldset>
    {% include "./_post" %}
    <button type="submit">Submit</button>
  </fieldset>
</form>
{% endblock %}
