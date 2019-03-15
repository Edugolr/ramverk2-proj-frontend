<template>
    <div>
  <b-jumbotron>
    <template slot="header">Bootstrap Vue</template>

    <template slot="lead">
      This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
      featured content or information.
    </template>

    <hr class="my-4" />

    <p>
      It uses utility classes for typography and spacing to space content out within the larger
      container.
    </p>

    <b-button variant="primary" href="#">Do Something</b-button>
    <b-button variant="success" href="#">Do Something Else</b-button>
  </b-jumbotron>
</div>
  <!-- <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
     This is a project in the BTH course Ramverk2
      <a href="https://dbwebb.se/kurser/ramverk2-v2" target="_blank" rel="noopener"
        >Course info</a
      >.
    </p>
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

  </div> -->
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
