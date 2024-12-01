<template>
  <div id="app">
    <!-- Conteúdo global, como barra de navegação, se necessário -->
    <router-view /> <!-- O Vue Router renderiza aqui o componente da rota atual -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Estilos globais ou específicos para este componente */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
