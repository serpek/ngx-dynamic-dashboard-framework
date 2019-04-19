import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import {PropertyControlService} from '@app/shared/dynamic-form/property-control.service';
import {LoaderComponent} from '@app/shared/loader/loader.component';
import {TypeAheadInputComponent} from '@app/shared/typeahead-input/typeahead-input.component';
import {CapitalizeFirstPipe} from '@app/shared/facet/capitalize-first-character-pipe';
import {ToastService} from '@app/shared/toast/toast.service';
import {ReversePipe} from '@app/shared/toast/reverse.pipe';
import {FilterTagComponent} from '@app/shared/facet/filter-tag-component';
import {FacetComponent} from '@app/shared/facet/facet-component';
import {AddGadgetService} from '@app/shared/add-gadget/service';
import {BoardLayoutManagerComponent} from '@app/shared/layout/layout-component';
import {NotificationService} from '@app/shared/notification/notification-service';
import {NotificationDetailComponent} from '@app/shared/notification/notificationDetail.component';
import {FilterListComponent} from '@app/shared/facet/filter-list-component';
import {DynamicFormPropertyComponent} from '@app/shared/dynamic-form/dynamic-form-property.component';
import {DynamicFormComponent} from '@app/shared/dynamic-form/dynamic-form.component';
import {DataListComponent} from '@app/shared/datalist/data-list.component';
import {NotificationComponent} from '@app/shared/notification/notification-component';
import {ToastComponent} from '@app/shared/toast/toast.component';
import {AddGadgetComponent} from '@app/shared/add-gadget/add-gadget-component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoaderComponent,
        AddGadgetComponent,
        ToastComponent,
        ReversePipe,
        NotificationComponent,
        NotificationDetailComponent,
        DataListComponent,
        FacetComponent,
        FilterListComponent,
        FilterTagComponent,
        CapitalizeFirstPipe,
        TypeAheadInputComponent,
        DynamicFormComponent,
        DynamicFormPropertyComponent,
        BoardLayoutManagerComponent
    ],
    providers: [
        ToastService,
        NotificationService,
        AddGadgetService,
        PropertyControlService
    ],
    exports: [
        LoaderComponent,
        AddGadgetComponent,
        ToastComponent,
        NotificationComponent,
        DataListComponent,
        FacetComponent,
        FilterListComponent,
        FilterTagComponent,
        CapitalizeFirstPipe,
        TypeAheadInputComponent,
        DynamicFormComponent,
        DynamicFormPropertyComponent,
        BoardLayoutManagerComponent
    ]
})
export class SharedModule {
}

