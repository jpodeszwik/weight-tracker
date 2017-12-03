<template>
  <div id="app">
    <header>
      <center><span>Weight Tracker</span></center>
    </header>
    <main>
      <sign-in v-if="!isAuthenicated"></sign-in>
      <weight-application v-if="isAuthenicated"></weight-application>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import WeightApplication from './components/WeightApplication';
import SignIn from './components/SignIn';

export default {
  computed: {
    ...mapGetters({
      isAuthenicated: 'isAuthenticated',
    }),
  },
  name: 'app',
  components: {
    WeightApplication,
    SignIn,
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
