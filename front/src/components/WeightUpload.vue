<template>
    <b-container>
      <b-row>
        <b-col cols="6">
          <b-form-input v-model="date" type="date"  placeholder="date" />
        </b-col>
        <b-col cols="4">
          <b-form-input v-model="weight" type="text" placeholder="weight" />
        </b-col>
        <b-col cols="2">
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
        this.$store.dispatch('addWeight', { date: this.date, weight: this.weight })
          .catch((e) => {
            this.$emit('error', e.message);
          });
      },
    },
  };
</script>
