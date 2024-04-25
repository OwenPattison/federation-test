import { createApp } from "vue";
import NotAButton from "./components/NotAButton.vue";

export const mount = (el: any) => {
    createApp(NotAButton).mount(el);
}
