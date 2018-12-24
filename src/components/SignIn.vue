<template>
  <center>
    <b-button size="xs" variant="success" @click="logInWithGoogle()">Sign in with google</b-button>
  </center>
</template>

<script>
import { logInWithGoogle } from '../lib/firebase';

export default {
  methods: {
    logInWithGoogle() {
      logInWithGoogle();
    },
  },
};
</script>

<style>
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>