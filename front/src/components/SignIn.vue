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

export default {
  data() {
    return {
      googleSignInParams: {
        client_id: '970458356704-jvcfdrhkl6v0498n1mhmfeis3ho987n5.apps.googleusercontent.com',
      },
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      const token = googleUser.getAuthResponse().id_token;
      this.loginOnBackend(token);
    },
    onSignInError(error) {
      console.error('authentication error', error);
    },
    loginOnBackend(token) {
      const body = JSON.stringify({ token });

      fetch(`${process.env.API_URL}/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body,
        })
        .then((response) => {
          if (response.ok) {
            this.setToken(token);
          }
        });
    },
    ...mapMutations({
      setToken: 'setToken',
    }),
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