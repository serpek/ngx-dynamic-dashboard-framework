import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {AboutModule} from '@app/about/about.module';
import {ConfigurationModule} from '@app/configuration/configuration.module';
import {GadgetModule} from '@app/gadgets/gadget.module';
import {EndPointService} from '@app/configuration/tab-endpoint/endpoint.service';
import {RuntimeService} from '@app/services/runtime.service';
import {ConfigurationService} from '@app/services/configuration.service';
import {GadgetPropertyService} from '@app/gadgets/_common/gadget-property.service';
import {ObservableWebSocketService} from '@app/services/websocket-service';
import {MenuEventService} from '@app/shell/menu/menu-service';
import {MenuComponent} from '@app/shell/menu/menu.component';
import {SharedModule} from '@app/shared';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AboutModule,
        ConfigurationModule,
        GadgetModule,
        MatButtonModule,
        MatIconModule
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
