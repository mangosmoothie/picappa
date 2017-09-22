<template>

  <b-container fluid>
    <b-row>
      <div v-for="tag in tags" class="tag btn btn-success"
           v-on:click="remove(tag)">
        {{ tag.name }}
      </div>
    </b-row>
  </b-container>
  
</template>

<script>
  export default {
    name: 'TagDisplay',
    props: ['tags'],
    methods: {
      remove: function(tag) { this.$emit('remove', tag) }
    }
  }
</script>

<style scoped>
.tag {
  float: left;
  margin: 2.5px;
}
</style>
