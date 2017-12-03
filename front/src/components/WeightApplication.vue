<template>
  <b-container>
      <weight-upload></weight-upload>
      <weight-list></weight-list>
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
};
</script>
