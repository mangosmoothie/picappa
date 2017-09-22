<template>

  <b-container fluid>
    <b-row>
      <b-col fluid>
        <fieldset class="fieldsetmargin">
          <legend class="legendbottom">All Tags</legend>
          <TagDisplay v-bind:tags=tags v-on:remove="removeTag" />
        </fieldset>
      </b-col>
    </b-row>
    <b-row>
      <b-col fluid>
        <fieldset class="fieldsetmargin">
          <legend class="legendbottom">Selected Tags</legend>
          <TagDisplay v-bind:tags=selectedTags v-on:remove="removeSelected" />
        </fieldset>
      </b-col>
    </b-row>
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

<style scoped>
.legendbottom {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #e5e5e5;
}
.fieldsetmargin {
    margin-bottom: 10px;
}
</style>
