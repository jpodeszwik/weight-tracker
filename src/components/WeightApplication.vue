<template>
  <b-container>
    <weight-upload @addWeight="addWeight"></weight-upload>
    <weight-list id="weightList" :weightList="weightList" @deleteWeight="deleteWeight"></weight-list>
  </b-container> 
</template>

<script>
import WeightUpload from './WeightUpload';
import WeightList from './WeightList';
import Api from '../lib/api';

const api = new Api(process.env.API_URL);

export default {
  name: 'weight-application',
  data() {
    return {
      weightList: [],
    };
  },
  components: {
    WeightUpload,
    WeightList,
  },
  mounted() {
    this.fetchWeights();
  },
  methods: {
    unauthorizeOrEmitError(e) {
      if (e.message === 'unauthorized') {
        this.$store.dispatch('setAuthenticated', false);
      } else {
        this.$emit('error', e.message);
      }
    },
    addWeight({ date, weight }) {
      api.addWeight(date, weight)
        .then(() => this.fetchWeights())
        .catch(e => this.unauthorizeOrEmitError(e));
    },
    fetchWeights() {
      api.fetchWeights()
        .then((weightList) => { this.weightList = weightList; })
        .catch(e => this.unauthorizeOrEmitError(e));
    },
    deleteWeight(date) {
      api.deleteWeight(date)
        .then(() => this.fetchWeights())
        .catch(e => this.unauthorizeOrEmitError(e));
    },
  },
};
</script>

<style>
#weightList {
  margin-top: 10px;
}
</style>
