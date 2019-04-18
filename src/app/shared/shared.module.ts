import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import {
    LoaderComponent,
    TypeAheadInputComponent,
    CapitalizeFirstPipe,
    ReversePipe,
    FilterTagComponent,
    FacetComponent,
    BoardLayoutManagerComponent,
    NotificationDetailComponent,
    FilterListComponent,
    DynamicFormPropertyComponent,
    DynamicFormComponent,
    DataListComponent,
    NotificationComponent,
    ToastComponent,
    AddGadgetComponent,
    PropertyControlService,
    ToastService,
    AddGadgetService,
    NotificationService
} from '@app/shared';

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
