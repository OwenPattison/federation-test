<template>
  <div class="hello">
    <h1>{{ message }}</h1>

    Add in remote app
    <!-- ##Here should be vue vite: <vite-vue-3 />## -->
    <ViteVue3 />
  </div>
</template>

<script lang="ts">
import { AsyncComponent } from '../SomeAsyncComponent';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ViteVue3 } from "./ViteVue3";

@Component({
    components: {
      // "vite-vue-3": AsyncComponent
      ViteVue3: ViteVue3
    }
})
export default class HelloWorld extends Vue {
  // @Prop({ type: String, default: "Wow" }) 
  // public msg!: string;

  public get message() {
    return "WOW";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
