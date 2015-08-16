<!DOCTYPE html>
<html>
<head>
  <title>Repo list</title>
</head>
<body>
  <h1>Private Git Server</h1>
  <table>
    <thead>
      <tr>
        <th>Group</th>
        <th>Name</th>
        <th>URL</th>
      </tr>
    </thead>
    {% for repo in repos %}
    <tr>
      <td>{{repo.group}}</td>
      <td>{{repo.name}}</td>
      <td>/{{repo.group}}/{{repo.name}}</td>
    </tr>
    {% endfor %}
  </table>

</body>

</html>
