<!DOCTYPE html>
<html>
<head>
  <title>Post {{post.id}}</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
  <article>
    <header>
      <h1>{{post.title}}</h1>
    </header>
    <section>
      {{post.content}}
    </section>
  </article>
</body>
</html>
