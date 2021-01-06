<template>
  <div class="content">
    <div class="sidebar">
      <div
        v-for="file in files"
        :key="file.id"
        class="item"
        @click="selectItem(file)"
      >
        {{ file.filename }}
      </div>
    </div>
    <main>
      <div v-if="!selectedItem" class="no-item">
        <h2>No item selected</h2>
        <p>Select one item to see the data, or upload something.</p>
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
      selectedItem: null,
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
  },
  computed: {
    ...mapGetters(["files"]),
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
  border-right: 1px black solid;
  overflow-y: auto;
}

.item {
  height: 122px;
  border-bottom: 1px solid black;
}

.item:hover {
  background: gray;
}
</style>