import Vuex from "vuex";
import Axios from "axios";
import File from "../../models/File";

const store = new Vuex.Store({
  state: {
    files: JSON.parse(localStorage.getItem("files")) || [],
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
      localStorage.setItem("files", JSON.stringify(newFiles));
    },
    removeFile(state, id) {
      const newFiles = [...state.files.filter((file) => file.id !== id)];
      state.files = newFiles;
    },
  },
  actions: {
    async uploadFile({ state, commit }, { fileAddress, event, startEvent }) {
      if (!fileAddress) {
        console.warn("No file was selected...");
        return;
      }
      const formData = new FormData();
      formData.append("file", fileAddress);

      const fileToAdd = new File(null, fileAddress.name, "", 0, null, false);
      if (startEvent) {
        startEvent(fileToAdd.id);
      }

      commit("addFile", { file: fileToAdd });

      const signal = Axios.CancelToken.source();
      try {
        const response = await Axios.post(
          "https://api.anonymousfiles.io/",
          formData,
          {
            cancelToken: signal.token,
            onUploadProgress: (progress) => {
              const currentProgress = (progress.loaded / progress.total) * 100;
              event(currentProgress);
              commit("addFile", {
                file: {
                  ...fileToAdd,
                  progress: currentProgress,
                  cancel: signal.cancel,
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
          id: fileToAdd.id,
        });

        localStorage.setItem("files", JSON.stringify(state.files));
      } catch (err) {
        console.warn("Request was canceled.", err);
        commit("removeFile", fileToAdd.id);
      }
    },
    cancelUpload({ state, commit }, id) {
      const { files } = state;
      const fileToCancel = files.find((file) => file.id === id);
      if (fileToCancel.cancel) {
        fileToCancel.cancel(`${fileToCancel.filename} was cancelled.`);
      } else {
        console.log("This file is no longer uploading, deleting instead.");
        commit("removeFile", id);
      }
    },
  },
});

export default store;
