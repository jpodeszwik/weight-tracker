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
    props: ['weightList'],
    data() {
      return {
        fields,
      };
    },
    methods: {
      deleteWeight(date) {
        this.$emit('deleteWeight', date);
      },
    },
  };
</script>
