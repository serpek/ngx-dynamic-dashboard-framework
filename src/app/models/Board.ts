import {PropertyBase} from '@app/shared/dynamic-form/property-base';

export class Board implements IBoard {
    title = 'Dashboard';
    structure = '6-6';
    id = new Date().getTime();
    layoutId = 0;
    deviceId = 1;
    boardInstanceID = new Date().getTime();
    rows: IRow[] = [
        {
            columns: [
                {
                    styleClass: 'six wide',
                    gadgets: []
                },
                {
                    styleClass: 'six wide',
                    gadgets: []
                }
            ]
        }
    ];
    animationIn = '';
    animationOut = '';

    constructor(props?: IBoard) {
        const device = localStorage.getItem('deviceId');
        this.deviceId = Number.parseInt(device, 0) || 1;
        Object.assign(this, props);
    }
}

export interface IBoard {
    _id?: string;
    title?: string;
    structure?: string;
    id?: number;
    layoutId?: number;
    deviceId?: number;
    boardInstanceID?: number;
    rows?: IRow[];
    animationIn?: string;
    animationOut?: string;
}

export interface IRow {
    columns?: IColumn[];
}

export interface IColumn {
    styleClass?: string;
    gadgets?: IGadget[];
}

export interface IGadget {
    componentType?: string;
    name?: string;
    description?: string;
    icon?: string;
    instanceId?: number;
    tags?: ITag[];
    config?: IConfig;
    actions?: IAction[];
    cols: number;
    rows: number;
    y: number;
    x: number;

    run(): void;

    stop(): void;

    toggleConfigMode(): void;

    initializeProperties(): void;

    updateProperties(updatedProperties: any): any;

    updateData(data: any[]): void;

    handleError(error: any): void;

    remove(): any;

    showGadgetControls(enable: boolean): any;

    configureGadget(instanceId: number, config: IConfig, tags: Array<ITag>): void;

    updateGadgetWithGlobalOptions(options: any): void;
}

export interface IAction {
    name?: Name;
}

export enum Name {
    Add = 'Add',
}

export interface IConfig {
    propertyPages?: IPropertyPage[];
}

export interface IPropertyPage {
    displayName?: IDisplayName;
    groupID?: GroupID;
    position?: number;
    properties?: PropertyBase<any>[];
}

export enum IDisplayName {
    Chart = 'Chart',
    List = 'List',
    Run = 'Run',
    Visual = 'Visual',
    Threshold = 'Threshold',
    Thresholds = 'Thresholds',
}

export enum GroupID {
    Alert = 'alert',
    Chart = 'chart',
    Visual = 'visual',
    Run = 'run',
    Threshold = 'threshold',
    Thresholds = 'thresholds'
}

export interface IProperty {
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: ControlType;
    options?: IOption[];
    type?: any;
}

export enum ControlType {
    Checkbox = 'checkbox',
    Dropdown = 'dropdown',
    PreviewDropdown = 'previewdropdown',
    Dynamicdropdown = 'dynamicdropdown',
    Hidden = 'hidden',
    Number = 'number',
    Textbox = 'textbox',
}

export interface IOption {
    key?: string;
    value?: string;
}

export type Value = boolean | number | string;

export interface ITag {
    facet?: string;
    name?: string;
}
