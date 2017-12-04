<template>
  <b-container>
    <b-alert variant="danger"
             dismissible
             :show="showAlert"
             @dismissed="showAlert=false">
      {{errorMessage}}
    </b-alert>
    <b-table striped hover :items="weightList" :fields="fields">
      <template slot="delete" scope="row">
        <b-button size="xs" variant="danger" @click="deleteWeight(row.item.date)">Delete</b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
  import { mapGetters } from 'vuex';

  const fields = [
    'date',
    'weight',
    {
      key: 'delete',
      label: ' ',
    },
  ];

  export default {
    name: 'weight-list',
    data() {
      return {
        fields,
        showAlert: false,
        errorMessage: '',
      };
    },
    mounted() {
      this.fetchWeights();
    },
    computed: {
      ...mapGetters({
        weightList: 'getWeightList',
      }),
    },
    methods: {
      deleteWeight(date) {
        this.$store.dispatch('deleteWeight', date)
          .catch((e) => {
            this.showAlert = true;
            this.errorMessage = e.message;
          });
      },
      fetchWeights() {
        this.$store.dispatch('fetchWeights')
          .catch((e) => {
            this.showAlert = true;
            this.errorMessage = e.message;
          });
      },
    },
  };
</script>

<style>
    
</style>

