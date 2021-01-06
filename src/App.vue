<template>
  <div class="content">
    <div class="sidebar">
      <div
        v-for="item in items"
        :key="item"
        class="item"
        @click="selectItem(item)"
      >
        {{ item }}
      </div>
    </div>
    <main>
      <div v-if="!selectedItem" class="no-item">
        <h2>No item selected</h2>
        <p>Select one item to see the data, or upload something.</p>
      </div>
      <div class="selected-item">
        <h2>{{ selectedItem }}</h2>
        <p>File url</p>
        <div class="selected-item-actions">
          <button>Copy</button>
          <button>Delete</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ["Archivo 1", "Archivo 2", "Archivo 3", "Archivo 4", "Archivo 5"],
      selectedItem: null,
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
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