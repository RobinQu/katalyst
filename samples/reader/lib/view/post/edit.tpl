{% extends "../layout/default" %}

{% block body %}
<form action="/posts/{{post.id}}/update" method="POST">
  <legend>Edit Post</legend>
  <fieldset>
    {% include "./_post.tpl" %}
    <button type="submit">Submit</button>
  </fieldset>
</form>
{% endblock %}
