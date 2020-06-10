'use strict';

import axios from 'axios';
import jwt from 'jwt-decode';

const ENDPOINT = 'http://localhost:3000';
const AUTH_TOKEN_KEY = 'authToken';
const ROLE = 'role';

//FUNCION LOGIN
export function loginUser(user, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/auth`,
        method: 'POST',
        data: {
          user: user,
          password: password,
          grant_type: 'password'
        }
      });
      setAuthToken(res.data.token);
      setIsAdmin(resolve.data.isAdmin);
      resolve();
    } catch (error) {
      console.log('Error Login :', error);
      reject(error);
    }
  });
}

// Exportamos

export function setAuthToken(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

// Log out

export function clearLogin() {
  axios.defaults.headers.common['Authorization'] = '';
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

// Coger el Token
export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// CONSIGUIENDO FECHA DE EXPEIRACION

export function getTokenExpirationDate(encodedToken) {
  let token = jwt(encodedToken);
  if (!token.exp) {
    // si no hay token ...pal carrer
    return null;
  }
  let date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}
// Comprobando si la fecha sigue vigente
export function isTokenExpired(token) {
  let expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
// Comprobar si el user esta logueado o no

export function isLoggedIn() {
  let authToken = getAuthToken();
  return !!authToken && !isTokenExpired(authToken);
}

// Funciones para comprobar rol de user

//Guardar si es admin en localstorage
export function setIsAdmin(isAdmin) {
  localStorage.setItem(ROLE, isAdmin);
}

// Borrar Rol del user En local storage
export function clearAdmin() {
  return localStorage.removeItem(ROLE);
}
// Recuperar Role guardado en localstorage
export function getAdmin() {
  return localStorage.getItem(ROLE);
}
// Comprobar Role
export function checkAdmin() {
  let role = false;
  let isAdmin = getIsAdmin();
  if (isAdmin === 'true') {
    role = true;
  } else {
    role = false;
  }
  return role;
}
