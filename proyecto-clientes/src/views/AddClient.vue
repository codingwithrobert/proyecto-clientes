<template>
  <div class="add-client-container">
    <div class="form-container">
      <h2 class="register">Register Client</h2>
      <!------------------------------------------------- Formulario -------------------------------------------->
      <!--- Name--->
      <label for="name">Name:</label>
      <input type="text" name="name" placeholder="client name here" v-model="name" />
      <br />
      <!--- Apellido--->
      <label for="surname">Surname:</label>
      <input type="text" name="surname" placeholder="client surname here" v-model="surname" />
      <br />
      <!--- City--->
      <label for="city">City:</label>
      <input type="text" name="city" placeholder="city client here" v-model="city" />
      <br />
      <!--- company--->
      <label for="company">Company:</label>
      <input type="text" name="company" placeholder="company client here" v-model="company" />
      <br />
      <button @click="addClient(name,surname,city,company)">CREAR</button>

      <!------------------------------------------------- Fin Formulario -------------------------------------------->
    </div>
  </div>
</template>

<script>
// Modulos Requeridos
import axios from 'axios';
export default {
  name: 'AddClient',
  data() {
    return {
      name: '',
      surname: '',
      city: '',
      company: ''
    };
  },
  methods: {
    addClient(name, surname, city, company) {
      var self = this;
      axios
        .post('http://localhost:3000/add', {
          name: self.name,
          surname: self.surname,
          city: self.city,
          company: self.company
        })
        // Si la peticion es 200 (ok) que se llene el array de notas
        .then(response => {
          location.reload();
          self.clients = response.data;
        })
        // de lo contrario tirame un error
        .catch(error => console.log(error));
    }
  }
};
</script>

<style>
</style>