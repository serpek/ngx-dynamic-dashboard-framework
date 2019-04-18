import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {DndModule} from 'ng2-dnd';
import {NotificationModule} from '@app/notification/notification.module';
import {AddGadgetModule} from '@app/add-gadget/add-gadget.module';
import {LayoutModule} from '@app/layout/layout.module';
import {AboutModule} from '@app/about/about.module';
import {ConfigurationModule} from '@app/configuration/configuration.module';
import {GadgetModule} from '@app/gadgets/gadget.module';
import {TypeAheadInputModule} from '@app/typeahead-input/typeahead-input.module';
import {EndPointService} from '@app/configuration/tab-endpoint/endpoint.service';
import {RuntimeService} from '@app/services/runtime.service';
import {ConfigurationService} from '@app/services/configuration.service';
import {GadgetPropertyService} from '@app/gadgets/_common/gadget-property.service';
import {ObservableWebSocketService} from '@app/services/websocket-service';
import {MenuEventService} from '@app/shell/menu/menu-service';
import {MenuComponent} from '@app/shell/menu/menu.component';

@NgModule({
    imports: [
        CommonModule,
        NotificationModule,
        AddGadgetModule,
        LayoutModule,
        AboutModule,
        ConfigurationModule,
        GadgetModule,
        DndModule.forRoot(),
        MatButtonModule,
        MatIconModule,
        TypeAheadInputModule
    ],
    providers: [
        EndPointService,
        RuntimeService,
        ConfigurationService,
        GadgetPropertyService,
        ObservableWebSocketService,
        MenuEventService
    ],
    declarations: [
        MenuComponent
    ],
    exports: [
        MenuComponent
    ]
})
export class MenuModule {
}
