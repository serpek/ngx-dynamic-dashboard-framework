interface IGadget {
    run(): void;

    stop(): void;

    toggleConfigMode(): void;

    initializeProperties(): void;

    updateProperties(updatedProperties: any): any;

    updateData(data: any[]): void;

    handleError(error: any): void;

    remove(): any;

    showGadgetControls(enable: boolean): any;

    configureGadget(instanceId: number, config: any, tags: Array<any>): void;

    updateGadgetWithGlobalOptions(options: any): void;
}
