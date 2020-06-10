<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <button @click="logoutUser()" class="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>
<script>
// Importamos modulos
import { clearLogin } from './api/utils';
export default {
  name: 'App',
  methods: {
    logoutUser() {
      this.$router.push('/');
      return clearLogin();
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-around;
  padding: 30px;
  background-color: #21d4fd;
  background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
}

#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin-top: 0.9rem;
}

#nav a.router-link-exact-active {
  color: white;
  text-decoration: none;
}
.logout {
  background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
}
.add-client-container,
.container-login {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-container,
.signin {
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
}
button {
  border: none;
  background-color: #21d4fd;
  background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
  border-radius: 0.3rem;
  height: 2rem;
  color: white;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  margin: 0.3rem;
}
.clientes {
  width: 20rem;
}
span {
  display: block;
  margin: 1rem;
  font-weight: 500;
}
label {
  margin: 0.1rem;
  font-weight: 500;
}
input {
  margin-bottom: 1rem;
}
hr {
  height: 0.1rem;
  outline: none;
}
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.register {
  font-size: 2.5rem;
}
</style>
