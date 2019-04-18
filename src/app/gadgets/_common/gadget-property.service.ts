import {Injectable} from '@angular/core';
import {PropertyBase} from '@app/shared/dynamic-form/property-base';
import {DropdownProperty} from '@app/shared/dynamic-form/property-dropdown';
import {TextboxProperty} from '@app/shared/dynamic-form/property-textbox';
import {CheckboxProperty} from '@app/shared/dynamic-form/property-checkbox';
import {HiddenProperty} from '@app/shared/dynamic-form/property-hidden';
import {NumberProperty} from '@app/shared/dynamic-form/property-number';
import {DynamicDropdownProperty} from '@app/shared/dynamic-form/property-dynamicdropdown';

@Injectable()
export class GadgetPropertyService {

    constructor() {
    }

    setPropertiesAndValues(defaultProperties: any[], properties: PropertyBase<any>[]) {
        let ctrl: PropertyBase<any>;
        properties.length = 0;
        defaultProperties.forEach((property: any) => {
            if (property.controlType === 'dropdown') {
                ctrl = new DropdownProperty(property);
                properties.push(ctrl);
            } else if (property.controlType === 'textbox') {
                ctrl = new TextboxProperty(property);
                properties.push(ctrl);
            } else if (property.controlType === 'checkbox') {
                ctrl = new CheckboxProperty(property);
                properties.push(ctrl);
            } else if (property.controlType === 'hidden') {
                ctrl = new HiddenProperty(property);
                properties.push(ctrl);
            } else if (property.controlType === 'number') {
                ctrl = new NumberProperty(property);
                properties.push(ctrl);
            } else if (property.controlType === 'dynamicdropdown') {
                ctrl = new DynamicDropdownProperty(property);
                properties.push(ctrl);
            }
        });
        properties.sort((a, b) => a.order - b.order);
    }

    setPropertyPagesAndProperties(defaultPropertyPages: any[], propertyPages: any[]) {
        const me = this;
        // for each defaultPropertyPage object, get the properties
        defaultPropertyPages.forEach((propertyPage: any) => {
            const newPropertyPage: any = {};
            for (const property in propertyPage) {
                if (propertyPage.hasOwnProperty(property)) {
                    if (property !== 'properties') {
                        newPropertyPage[property] = propertyPage[property];
                    } else {
                        const properties: PropertyBase<any>[] = [];
                        me.setPropertiesAndValues(propertyPage.properties, properties);
                        newPropertyPage['properties'] = properties;
                    }
                }
            }
            propertyPages.push(newPropertyPage);
        });
    }
}
