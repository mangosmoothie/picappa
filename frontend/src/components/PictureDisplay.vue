<template>

  <b-container fluid>
    <TagDisplay v-bind:tags=tags v-on:remove="removeTag" />
    <hr/>
    <TagDisplay v-bind:tags=selectedTags v-on:remove="removeSelected" />
  </b-container>
  
</template>

<script>
  import axios from 'axios'
  import TagDisplay from './TagDisplay.vue'

  export default {
    name: 'PictureDisplay',
    data() {
      return {
        tags: [],
        selectedTags: []
      }
    },
    methods: {
      removeTag: function(t) {
        this.tags = this.tags.filter((tag) => tag.name != t.name);
        this.selectedTags.push(t);
      },
      removeSelected: function(t) {
        this.selectedTags = this.selectedTags.filter((tag) => tag.name != t.name);
        this.tags.push(t);
      }
    },
    mounted: function() {
      axios.get('/api/all-tags')
        .then( (response) => {
          this.tags = response.data.tags;
        });
    },
    components: {
      TagDisplay
    }
  }
</script>
