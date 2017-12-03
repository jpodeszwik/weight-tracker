<template>
    <b-container>
      <div>
        <b-row>
          <b-col>
            <b-form-input v-model="date" type="date"  placeholder="Enter date" />
          </b-col>
          <b-col>
            <b-form-input v-model="weight" type="text" placeholder="Your weight" />
          </b-col>
          <b-col>
            <b-button size="xs" variant="success" @click="saveNewRecord()">Add</b-button>
          </b-col>
        </b-row>
       
                  
          <b-table striped hover :items="items" :fields="fields">
            <template slot="delete" scope="row">
              <b-button size="xs" variant="danger" @click="deleteRow(row)">Delete</b-button>
            </template>
          </b-table>
      </div>
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
        date: new Date().toISOString().split('T')[0],
        weight: '',
      };
    },
    mounted() {
      this.fetchRows();
    },
    methods: {
      saveNewRecord() {
        fetch(`${process.env.API_URL}/api/weights`,
          {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: this.date, values: { weight: this.weight } }),
          })
          .then((response) => {
            if (response.ok) {
              this.fetchRows();
            }
          });
      },
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

