declare module "components/app/app.component" {
    export default TempletteApp;
    class TempletteApp extends HTMLElement {
    }
}
declare module "components/app/app.template" {
    export default template;
    const template: HTMLTemplateElement;
}
declare module "components/builder/builder.component" {
    export default TempletteBuilder;
    class TempletteBuilder extends HTMLElement {
        /** @type {HTMLButtonElement} */
        addSegmentButton: HTMLButtonElement;
        /** @type {HTMLUListElement} */
        listNode: HTMLUListElement;
        addSegment(): void;
        #private;
    }
}
declare module "components/builder/builder.template" {
    export default template;
    const template: HTMLTemplateElement;
}
declare module "components/data/data.component" {
    export default TempletteData;
    class TempletteData extends HTMLElement {
    }
}
declare module "components/data/data.template" {
    export default template;
    const template: HTMLTemplateElement;
}
declare module "components/segment/segment.component" {
    export default TempletteSegment;
    class TempletteSegment extends HTMLElement {
        segmentContent: Element | null;
    }
}
declare module "components/segment/segment.template" {
    export default template;
    const template: HTMLTemplateElement;
}
