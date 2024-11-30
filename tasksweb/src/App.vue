<template>
  <div id="app">
    <LoginComponent/>
      <router-view />
  </div>
</template>

<script>
import LoginComponent from './components/LoginComponent.vue';

export default {

  name: 'App',
  components: {
    LoginComponent,
   

  },
};
</script>

<style>
/* Estilos globais ou específicos para este componente */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>