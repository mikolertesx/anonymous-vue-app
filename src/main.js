import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ProgressBar from "primevue/progressbar";
import App from "./App.vue";
import files from "./store/files/";

// CSS libraries for prime-icons.
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue);
app.component("progress-bar", ProgressBar);
app.use(files);

app.mount("#app");
