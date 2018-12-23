<template>
  <center>
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
      Sign in with Google
    </g-signin-button>
  </center>
</template>

<script>
import { mapMutations } from 'vuex';
import Api from '../lib/api';

const api = new Api(process.env.API_URL);

export default {
  data() {
    return {
      googleSignInParams: {
        client_id: process.env.GOOGLE_CLIENT_ID,
      },
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      const token = googleUser.getAuthResponse().id_token;
      this.loginOnBackend(token);
    },
    onSignInError(e) {
      this.$emit('authentication error', e.message);
    },
    loginOnBackend(token) {
      api.login(token)
        .then((response) => {
          if (response.ok) {
            this.setAuthenticated(true);
          }
        })
        .catch((e) => {
          this.$emit('error', e.message);
        });
    },
    ...mapMutations(['setAuthenticated']),
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