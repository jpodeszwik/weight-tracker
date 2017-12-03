<template>
    <b-container>
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
  </b-container>
</template>

<script>
  export default {
    name: 'weight-upload',
    data() {
      return {
        date: new Date().toISOString().split('T')[0],
        weight: '',
      };
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
              console.log('ok');
            }
          });
      },
    },
  };
</script>
