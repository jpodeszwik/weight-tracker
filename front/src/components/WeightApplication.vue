<template>
  <b-container>
    <weight-upload @error="emitError"></weight-upload>
    <weight-list @error="emitError"></weight-list>
  </b-container> 
</template>

<script>
import WeightUpload from './WeightUpload';
import WeightList from './WeightList';

export default {
  name: 'weight-application',
  components: {
    WeightUpload,
    WeightList,
  },
  methods: {
    emitError(errorMessage) {
      this.$emit('error', errorMessage);
    },
  },
};
</script>
