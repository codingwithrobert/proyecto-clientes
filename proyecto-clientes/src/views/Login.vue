<template>
  <div class="container-login">
    <div class="signin">
      <h2>Sign In</h2>
      <label for="user">User:</label>
      <input type="text" placeholder="user" v-model="user" />
      <label for="password">Password:</label>
      <input type="password" placeholder="password" v-model="password" />
      <button @click="login()">LOG IN</button>
    </div>
  </div>
</template>

<script>
import { loginUser } from '../api/utils';
export default {
  name: 'Login',
  data() {
    return {
      user: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        // Intento hacer login
        await loginUser(this.user, this.password);
        // Si hay login , que me lleve al home
        this.$router.push('/home');
      } catch (error) {
        alert(`Error : ${error}`);
      }
    }
  }
};
</script>

<style scoped></style>
