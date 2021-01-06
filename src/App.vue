<template>
  <div class="content">
    <div class="sidebar">
      <div
        v-for="file in files"
        :key="file.id"
        class="item"
        @click="selectItem(file.id)"
      >
        <p>{{ file.filename }}</p>
        <!-- TODO Add a circle progress bar -->
        <p>{{ parseInt(file.progress) }}%</p>
      </div>
      <div class="item" @click="selectItem(null)">+</div>
    </div>
    <main>
      <div v-if="!selectedItem" class="no-item">
        <h2>No item selected</h2>
        <p>Select one item to see the data, or upload something.</p>
        <input type="file" @change="submitFile" ref="file" />
      </div>
      <div v-else class="selected-item">
        <h2>{{ selectedItem.filename }}</h2>
        <p>{{ selectedItem.url }}</p>
        <div class="selected-item-actions">
          <button>Copy</button>
          <button>Delete</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
    submitFile() {
      const event = () => {};
      this.$store.dispatch("uploadFile", {
        fileAddress: this.$refs.file.files[0],
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
  flex-basis: 30%;
  max-width: 256px;
  border-right: 1px black solid;
  overflow-y: auto;
}

.item {
  height: 122px;
  border-bottom: 1px solid black;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.item * {
  margin: 4px;
}

.item:hover {
  background: gray;
}
</style>