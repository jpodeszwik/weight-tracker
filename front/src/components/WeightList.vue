<template>
  <b-container>
    <b-table striped hover :items="weightList" :fields="fields">
      <template slot="delete" scope="row">
        <b-button size="xs" variant="danger" @click="deleteWeight(row.item.date)">Delete</b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

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
      ...mapActions([
        'deleteWeight',
        'fetchWeights',
      ]),
    },
  };
</script>

<style>
    
</style>

