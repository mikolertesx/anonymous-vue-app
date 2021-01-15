<template>
  <div class="item" @click="$emit('selectItem', id)">
    <p>{{ filename }}</p>
    <i class="pi pi-times" @click="cancelUpload(id)"></i>
    <progress-bar
      :value="progress"
      style="width: 100%; color: white; height: 40px"
    >
      <p style="color: white">{{ progress }}%</p>
    </progress-bar>
  </div>
</template>

<script>
export default {
  props: ["file"],
  computed: {
    id() {
      return this.file.id;
    },
    filename: {
      get() {
        return this.file.filename;
      },
      set(value) {
        const newFile = { ...this.file };
        newFile.filename = value;
        this.$store.commit("addFile", { file: newFile, id: this.id });
      },
    },
    progress() {
      return parseInt(this.file.progress || 0);
    },
  },
  methods: {
    cancelUpload(id) {
      this.$store.dispatch("cancelUpload", id);
    },
  },
};
</script>

<style>
.item {
  min-height: 122px;
  border-bottom: 1px solid black;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>