<template>
  <div class="user-details">
    <span>Logged in as <b>{{ user.email }}</b></span>
    <b-button size="xs" @click="logOut()">Log out</b-button>
  </div>
</template>

<script>
import { logOut } from '../lib/firebase';

export default {
  props: ['user'],
  methods: {
    logOut() {
      logOut();
    },
  },
};
</script>