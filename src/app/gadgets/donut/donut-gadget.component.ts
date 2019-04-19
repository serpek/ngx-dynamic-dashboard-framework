import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {style, trigger, animate, transition, state} from '@angular/animations';

import {GadgetBase} from '@app/gadgets/_common/gadget-base';
import {GadgetInstanceService} from '@app/grid/grid.service';
import {DonutService} from '@app/gadgets/donut/service';
import {APITokenService} from '@app/services/api-token.service';
import {OptionsService} from '@app/configuration/tab-options/service';
import {RuntimeService} from '@app/services/runtime.service';
import {EndPointService} from '@app/configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from '@app/gadgets/_common/gadget-property.service';

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css'],
    animations: [

        trigger('accordion', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('700ms ease-in-out')),
            transition('out => in', animate('300ms ease-in-out'))
        ]),
        trigger('accordion2', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('300ms ease-in-out')),
            transition('out => in', animate('800ms ease-in-out'))
        ])
    ]
})
export class DonutGadgetComponent extends GadgetBase implements OnDestroy {
    topic: any;
    data = {};
    colorScheme = {
        domain: ['#0cd057', '#3f8eff', '#9a0101']
    };
    detailMenuOpen: string;
    donutServiceSubscription: any;

    // gadget properties
    autoCompliance: boolean;
    complianceFrequency: number;

    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                protected _changeDetectionRef: ChangeDetectorRef,
                protected _donutService: DonutService,
                protected  _apiTokenService: APITokenService,
                protected _optionsService: OptionsService) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef,
            _optionsService);
    }

    public preRun(): void {

        this.setTopic();
        this.setProperties();
        this.run();

    }

    public run() {

        this.initializeRunState(true);
        this.updateData(null);
    }

    public stop() {

        if (this.donutServiceSubscription) {
            this.donutServiceSubscription.unsubscribe();
        }
        this.setStopState(false);
    }

    public updateData(data: any[]) {

        this.donutServiceSubscription = this._donutService.poll().subscribe(donutData => {

            const me = this;

            this._donutService.get().subscribe(_data => {

                    me.data = _data;
                },
                error => this.handleError(error));
        });
    }

    public updateProperties(updatedProperties: any) {
        const updatedPropsObject = JSON.parse(updatedProperties);
        this.propertyPages.forEach((propertyPage: any) => {
            for (let x = 0; x < propertyPage.properties.length; x++) {

                for (const prop in updatedPropsObject) {
                    if (updatedPropsObject.hasOwnProperty(prop)) {
                        if (prop === propertyPage.properties[x].key) {
                            propertyPage.properties[x].value = updatedPropsObject[prop];
                        }

                    }
                }
            }
        });

        this.title = updatedPropsObject.title;
        this.autoCompliance = updatedPropsObject.auto;
        this.complianceFrequency = updatedPropsObject.frequency;
        this.showOperationControls = true;

        this.setEndPoint(updatedPropsObject.endpoint);
    }

    setTopic() {
        this._donutService.getHelpTopic().subscribe(data => {
            this.topic = data;
        });
    }

    public setProperties() {

        this.title = this.getPropFromPropertyPages('title');
        this.detailMenuOpen = 'out';
    }


    toggleAccordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }

    public ngOnDestroy() {

        this.stop();

    }
}
