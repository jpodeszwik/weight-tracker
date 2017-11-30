<template>
    <b-container>
      <div>
          <b-table striped hover :items="items" :fields="fields">
            <template slot="delete" scope="row">
              <b-button size="xs" variant="danger" @click="deleteRow(row)">Delete</b-button>
            </template>
          </b-table>
      </div>
    </b-container>
</template>

<script>
  const items = [
    { date: '2017-11-27', weight: 81 },
    { date: '2017-11-26', weight: 83 },
    { date: '2017-11-25', weight: 80 },
  ];

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
    methods: {
      deleteRow(row) {
        const message = `deleting ${row.item.date}`;
        this.items = this.items.filter(item => item.date !== row.item.date);
        console.log(message);
      },
    },
  };
</script>

<style>
    
</style>

