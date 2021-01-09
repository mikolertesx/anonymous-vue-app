<template>
  <div class="selected-item">
    <h2>{{ filename }}</h2>
    <p v-if="url">url</p>
    <!-- TODO Add a File is processing paragraph when progress is 100% and no url is there yet. -->
    <p v-else>File is being uploaded.</p>
    <i class="pi pi-file-o" style="font-size: 10rem; cursor: pointer"></i>
    <div class="selected-item-actions">
      <button><i class="pi pi-copy"></i></button>
      <button><i class="pi pi-exclamation-circle"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedItem"],
  computed: {
    filename() {
      return this.selectedItem.filename;
    },
    url() {
      return this.selectedItem.url;
    },
  },
};
</script>

<style>
</style>