<template>
  <div class="item" @click="$emit('selectItem', id)">
    <p>{{ filename }}</p>
    <!-- TODO Add a circle progress bar -->
    <i v-if="progress !== 100" class="pi pi-spin pi-spinner"></i>
    <p v-if="progress !== 100">{{ progress }}%</p>
  </div>
</template>

<script>
export default {
  props: ["file"],
  computed: {
    id() {
      return this.file.id;
    },
    filename() {
      return this.file.filename;
    },
    progress() {
      return parseInt(this.file.progress || 0);
    },
  },
};
</script>

<style>
.item {
  height: 122px;
  border-bottom: 1px solid black;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>