import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {AnimateLibrary} from '@app/models/animate-library.enum';
import {ControlType, IDisplayName, IGadget, IOption, IPropertyPage} from '@app/models/Board';
import {PropertyBase} from '@app/shared/dynamic-form/property-base';
import {map} from 'rxjs/operators';

@Injectable()
export class AddGadgetService {
    env: any;

    constructor(private _http: HttpClient) {
        this.env = environment;
    }
    getGadgetLibrary(): Observable<IGadget[]> {
        return this._http.get<IGadget[]>(`/gadgets`).pipe(
            map((result) => {
                const animList = Object.keys(AnimateLibrary).map(key => <IOption>{value: AnimateLibrary[key], key: key});
                const animConfig: IPropertyPage = <IPropertyPage>{
                    displayName: 'Visual',
                    groupID: 'visual',
                    position: 0,
                    properties: [
                        new PropertyBase({
                            controlType: ControlType.Dropdown,
                            key: 'animateIn',
                            value: '',
                            order: 0,
                            required: false,
                            label: 'Entry Animation',
                            options: animList
                        }),
                        new PropertyBase({
                            controlType: ControlType.Dropdown,
                            key: 'animateOut',
                            value: '',
                            order: 1,
                            required: false,
                            label: 'Exit Animation',
                            options: animList
                        })
                    ]
                };

                result.forEach(item => {
                    if (item.config.propertyPages && item.config.propertyPages.length) {
                        const index = item.config.propertyPages.findIndex(prop => prop.displayName === IDisplayName.Visual);
                        if (index === -1) {
                            item.config.propertyPages.push(animConfig);
                        }
                    }
                });
                return result;
            })
        );
    }
}
