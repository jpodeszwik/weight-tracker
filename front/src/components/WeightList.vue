<template>
  <b-container>
    <b-table striped hover :items="items" :fields="fields">
      <template slot="delete" scope="row">
        <b-button size="xs" variant="danger" @click="deleteRow(row)">Delete</b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
  const items = [];

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
        items,
        fields,
      };
    },
    mounted() {
      this.fetchRows();
    },
    methods: {
      deleteRow(row) {
        fetch(`${process.env.API_URL}/api/weights/${row.item.date}`, { method: 'DELETE', credentials: 'include' })
          .then((response) => {
            if (response.ok) {
              this.fetchRows();
            }
          });
      },
      fetchRows() {
        fetch(`${process.env.API_URL}/api/weights`, { credentials: 'include' })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('response error');
          })
          .then((newItems) => {
            this.items = newItems.map(item => ({ date: item.date, weight: item.values.weight }));
          });
      },
    },
  };
</script>

<style>
    
</style>

