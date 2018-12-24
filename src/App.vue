<template>
  <div id="app">
    <header>
      <center>
        <span>Weight Tracker</span>
      </center>
    </header>
    <main>
      <b-alert
        variant="danger"
        dismissible
        :show="showAlert"
        @dismissed="showAlert=false"
      >{{errorMessage}}</b-alert>
      <sign-in v-if="user === null" @error="displayAlert" />
      <user-details v-if="user !== null" :user="user" />
      <weight-application v-if="user !== null" @error="displayAlert" />
    </main>
  </div>
</template>

<script>
import { onUserChange } from './lib/firebase';
import WeightApplication from './components/WeightApplication';
import SignIn from './components/SignIn';
import UserDetails from './components/UserDetails';

export default {
  data() {
    return {
      user: null,
      showAlert: false,
      errorMessage: '',
    };
  },
  created() {
    onUserChange((user) => {
      this.user = user;
    });
  },
  name: 'app',
  components: {
    WeightApplication,
    SignIn,
    UserDetails,
  },
  methods: {
    displayAlert(errorMessage) {
      this.errorMessage = errorMessage;
      this.showAlert = true;
    },
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
  margin-top: 10px;
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
