import Vuex from "vuex";
import File from "../../models/File";

const store = new Vuex.Store({
  state: {
    files: [
      new File(
        "1",
        "Something really cool",
        "niceplace.com/",
        33,
        new Date(),
        true
      ),
    ],
  },
  getters: {
    files(state) {
      return state.files;
    },
  },
});

export default store;
