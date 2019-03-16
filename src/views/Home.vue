<template class="page">
    <div class="jumbotron jumbotron-fluid text-dark bg-light border border-info">
      <div class="container">
        <h1 class="display-4">Card Market</h1>
        <p>
         This is a project in the BTH course Ramverk2
          <a href="https://dbwebb.se/kurser/ramverk2-v2" target="_blank" rel="noopener"
            >Course info</a
          >.
        </p>
        <hr class="my-4" />
        <h3>Github repos</h3>
        <ul>
          <li>
            <a
              href="https://github.com/Edugolr/ramverk2-proj-frontend"
              target="_blank"
              rel="noopener"
              >frontend</a
            >
          </li>
          <li>
            <a
              href="https://github.com/Edugolr/ramverk2-proj-backend"
              target="_blank"
              rel="noopener"
              >backend</a
            >
          </li>
        </ul>
     </div>
</div>
</template>

<script>
// @ is an alias to /src


export default {
  name: "home",
};
</script>

<style media="screen">
    .logo {
        width: 10%;
        max-height: 92vh
    },

    h3 {
      margin: 40px 0 0;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin: 0 10px;
    }
    a {
      color: #42b983;
    }
</style>
