<template>
  <b-container>
    <weight-upload @addWeight="addWeight"></weight-upload>
    <weight-list id="weightList" :weightList="weightList" @deleteWeight="deleteWeight"></weight-list>
  </b-container>
</template>

<script>
import WeightUpload from './WeightUpload';
import WeightList from './WeightList';
import { addWeight, deleteWeight, subscribeForWeights } from '../lib/api';

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
    subscribeForWeights((weights) => {
      this.weightList = weights;
    });
  },
  methods: {
    addWeight({ date, weight }) {
      addWeight(date, weight).catch(e => this.$emit('error', e.message));
    },
    deleteWeight(date) {
      deleteWeight(date).catch(e => this.$emit('error', e.message));
    },
  },
};
</script>

<style>
#weightList {
  margin-top: 10px;
}
</style>
