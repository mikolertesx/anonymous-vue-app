<template>
  <div class="no-item">
    <h2>No item selected</h2>
    <p>Select one item to see the data, or upload something.</p>
    <i
      class="pi pi-cloud-upload"
      style="font-size: 10rem; cursor: pointer"
      @click="$refs.file.click()"
    ></i>
    <input
      type="file"
      @change="$emit('submitFile', $refs.file.files[0])"
      ref="file"
      hidden
    />
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>