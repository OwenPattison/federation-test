import Vue from 'vue'
import App from './App.vue'
import { AsyncComponent } from './SomeAsyncComponent'

Vue.config.productionTip = false


const vueApp = new Vue({
  render: h => h(App),
})

Vue.component(
  'vue-vite',
  AsyncComponent
)

vueApp.$mount('#app')
