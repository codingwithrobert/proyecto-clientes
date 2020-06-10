<template>
  <div class="home">
    <h2>Lista de Clientes</h2>
    <div class="clientes" v-for="client in clients" :key="client.id">
      <span>ID : {{client.id}}</span>
      <span>NAME : {{client.name}}</span>
      <span>SURNAME : {{client.surname}}</span>
      <span>CITY : {{client.city}}</span>
      <span>COMPANY : {{client.company}}</span>
      <hr>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      //array clientes DB
      clients: []
    };
  },
  methods: {
    getClients() {
      var self = this;
      axios
        .get('http://localhost:3000/clients')
        // Si la peticion es 200 (ok) que se llene el array de notas
        .then(response => (self.clients = response.data))
        // de lo contrario tirame un error
        .catch(error => console.log(error));
    }
  },
  // Cuando la web se cargue llamamos a las funciones con CREATED()
  created() {
    this.getClients();
  }
};
</script>
