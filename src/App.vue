<template>
  <div class="content">
    <div class="sidebar">
      <file-item
        v-for="file in files"
        :key="file.id"
        :file="file"
        @select-item="selectItem"
      ></file-item>
      <div class="item" @click="selectItem(null)">
        <i class="pi pi-plus" style="fontsize: 2rem"></i>
      </div>
    </div>
    <main>
      <unselected-item
        v-if="!selectedItem"
        @submit-file="submitFile"
      ></unselected-item>
      <selected-item v-else :selected-item="selectedItem"></selected-item>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SelectedItem from "./components/SelectedItem";
import UnselectedItem from "./components/UnselectedItem";
import FileItem from "./components/FileItem";

export default {
  components: {
    SelectedItem,
    UnselectedItem,
    FileItem,
  },
  data() {
    return {
      selectedIndex: null,
      selectedId: null,
    };
  },
  methods: {
    selectItem(id) {
      this.selectedId = id;
    },
    submitFile(file) {
      const event = () => {};
      this.$store.dispatch("uploadFile", {
        fileAddress: file,
        event,
      });
    },
  },
  computed: {
    ...mapGetters(["files"]),
    selectedItem() {
      return this.files.find((file) => file.id === this.selectedId) || null;
    },
  },
  mounted() {},
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.content {
  height: 100vh;
  width: 100vw;
  display: flex;
}

.sidebar {
  width: 256px;
  flex-shrink: 0;
  flex-grow: 0;
  border-right: 1px black solid;
  overflow-y: auto;
}

main {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item * {
  margin: 4px;
}

.item:hover {
  background: gray;
}
</style>