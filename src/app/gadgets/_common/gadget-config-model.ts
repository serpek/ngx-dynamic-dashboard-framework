import {PropertyBase} from '@app/shared/dynamic-form/property-base';
import {GroupID, IConfig, IDisplayName, IPropertyPage} from '@app/models/Board';

export class GadgetConfigModel implements IConfig {
    propertyPages: PropertyPage[] = [];

    constructor(config: IConfig) {
        config.propertyPages.forEach(page => {
            const props: PropertyBase<any>[] = [];

            page.properties.forEach(prop => {
                switch (prop.controlType) {
                    case 'textbox':
                    case 'dropdown':
                    case 'previewdropdown':
                    case 'dynamicdropdown':
                        props.push(new PropertyBase<string>(prop));
                        break;
                    case 'checkbox':
                        props.push(new PropertyBase<boolean>(prop));
                        break;
                    case 'hidden':
                        props.push(new PropertyBase<number>(prop));
                        break;
                    default:
                        props.push(new PropertyBase<string>(prop));
                        break;
                }
            });

            this.propertyPages.push(new PropertyPage(page.displayName, page.groupID, page.position, props));
        });
    }
}

class PropertyPage implements IPropertyPage {
    displayName: IDisplayName;
    groupID: GroupID;
    position: number;
    properties: PropertyBase<any>[];

    constructor(displayName: IDisplayName, groupId: GroupID, position: number, properties: PropertyBase<any>[]) {
        this.displayName = displayName;
        this.groupID = groupId;
        this.position = position;
        this.properties = properties;
    }
}
