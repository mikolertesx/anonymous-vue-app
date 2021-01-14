import Vuex from "vuex";
import Axios from "axios";
import File from "../../models/File";

const store = new Vuex.Store({
  state: {
    files: [],
  },
  getters: {
    files(state) {
      return state.files;
    },
  },
  mutations: {
    addFile(state, { file, id = null }) {
      const newFiles = [...state.files];

      if (id !== null) {
        const newFileIndex = newFiles.findIndex((file) => file.id === id);
        newFiles[newFileIndex] = file;
      } else {
        newFiles.push(file);
      }

      state.files = newFiles;
    },
  },
  actions: {
    async uploadFile({ state, commit }, { fileAddress, event }) {
      const formData = new FormData();
      formData.append("file", fileAddress);

      const fileToAdd = new File(null, fileAddress.name, "", 0, null, false);
      commit("addFile", { file: fileToAdd });
      const index = state.files.length - 1;

      const response = await Axios.post(
        "https://api.anonymousfiles.io/",
        formData,
        {
          onUploadProgress: (progress) => {
            const currentProgress = (progress.loaded / progress.total) * 100;
            event(currentProgress);
            commit("addFile", {
              file: {
                ...fileToAdd,
                progress: currentProgress,
              },
              id: fileToAdd.id,
            });
          },
        }
      );

      const { size, url } = response.data;

      commit("addFile", {
        file: {
          ...fileToAdd,
          date: new Date(),
          filesize: size,
          url,
          uploaded: true,
          progress: 100,
        },
        index,
      });
    },
  },
});

export default store;
