import type { VNode } from "vue";
import { Component, Ref, Vue } from "vue-property-decorator";

@Component
export class ViteVue3 extends Vue {

    @Ref()
    private appRef: any;

    public async mounted(): Promise<void> {
        const appRemote = await import("remoteVue3App/NotAButton");

        appRemote.mount(this.appRef);
    }

    public render(): VNode {
        return (
            <div ref="appRef" />
        );
    }
}

