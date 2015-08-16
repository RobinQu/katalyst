{% extends "../layout/default" %}

{% block body %}
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
{% endblock %}
