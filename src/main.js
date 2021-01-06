import { createApp } from "vue";
import App from "./App.vue";
import files from "./store/files/";

const app = createApp(App);
app.use(files);

app.mount("#app");
