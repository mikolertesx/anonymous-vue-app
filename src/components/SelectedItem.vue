<template>
  <div class="selected-item">
    <h2 v-if="!isEditing" style="font-size: 24px" @click="setEditMode(true)">
      {{ filename }}
    </h2>
    <input
      v-else
      style="font-size: 24px"
      type="text"
      v-model.trim="filename"
      @blur="setEditMode(false)"
      @keyup.enter="setEditMode(false)"
      ref="filenameModifier"
    />
    <textarea
      ref="hiddenLink"
      v-model="url"
      style="
        position: absolute;
        margin-left: -100%;
        margin-top: -100%;
        width: 0px;
      "
    ></textarea>
    <a v-if="url" :href="url" target="_blank">Go to download page.</a>
    <progress-bar
      v-else-if="progress !== 100"
      :value="progress"
      style="width: 100%; color: white; height: 40px"
    >
      <p style="color: white; font-size: 1.25rem">{{ progress }}%</p>
    </progress-bar>
    <p v-else>File is being processed.</p>
    <i class="pi pi-file-o" style="font-size: 10rem; cursor: pointer"></i>
    <div class="selected-item-actions">
      <button style="background-color: green" @click="copyLink">
        <i class="pi pi-copy"></i>
      </button>
      <button style="background-color: red" @click="removeFile(id)">
        <i class="pi pi-exclamation-circle"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedItem"],
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    id() {
      return this.selectedItem.id;
    },
    filename: {
      get() {
        return this.selectedItem.filename;
      },
      set(value) {
        const newFile = { ...this.selectedItem };
        newFile.filename = value;
        this.$store.commit("addFile", { file: newFile, id: this.id });
      },
    },
    url() {
      return this.selectedItem.url;
    },
    progress() {
      return parseInt(this.selectedItem.progress);
    },
  },
  methods: {
    copyLink() {
      const url = this.$refs.hiddenLink;
      url.select();
      url.setSelectionRange(0, 9999);
      document.execCommand("copy");
    },
    removeFile(id) {
      this.$store.dispatch("cancelUpload", id);
    },
    setEditMode(isOnEdit) {
      this.isEditing = isOnEdit;
      if (this.isEditing === true) {
        setTimeout(() => {
          this.$refs.filenameModifier.focus();
        }, 5);
      }
    },
  },
};
</script>

<style scoped>
.selected-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 100%;
  height: 100%;
  max-width: 1024px;
}

.selected-item > * {
  margin: 12px;
}

.selected-item h2 {
  text-align: center;
  width: 80%;
  line-height: 1.8rem;
}

.selected-item-actions {
  width: 80%;
  display: flex;
  justify-content: space-around;
}

.selected-item-actions button {
  border: 1px solid gray;
  cursor: pointer;
  outline: none;
  width: 126px;
  height: 126px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.selected-item-actions button .pi {
  color: white;
  font-size: 3rem;
}
</style>