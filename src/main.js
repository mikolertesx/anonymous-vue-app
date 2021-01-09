import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import files from "./store/files/";

const app = createApp(App);
app.use(PrimeVue);
app.use(files);

app.mount("#app");
