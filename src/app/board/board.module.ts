import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule, MatOptionModule,
    MatProgressBarModule, MatSelectModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';

import {GridModule} from '@app/grid/grid.module';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {BoardRoutingModule} from '@app/board/board-routing.module';
import {BoardComponent} from '@app/board/board.component';
import {ErrorHandlerModule} from '@app/error/error.module';
import {EndPointService} from '@app/configuration/tab-endpoint/endpoint.service';
import {OptionsService} from '@app/configuration/tab-options/service';
import {RuntimeService} from '@app/services/runtime.service';
import {ConfigurationService} from '@app/services/configuration.service';
import {ObservableWebSocketService} from '@app/services/websocket-service';

import {GadgetPropertyService} from '@app/gadgets/_common/gadget-property.service';

import {
    GadgetSharedModule,
    MemoryGadgetComponent,
    CPUGadgetComponent,
    ServiceListGadgetComponent,
    PropertyListGadgetComponent,
    DiskGadgetComponent,
    StatisticGadgetComponent,
    TrendGadgetComponent,
    NewsGadgetComponent,
    JobAnalysisGadgetComponent,
    TrendLineGadgetComponent,
    EdgeServiceListGadgetComponent,
    CPUMGadgetComponent,
    StorageObjectListComponent,
    DonutGadgetComponent,
    TodoGadgetComponent,
    BubbleGadgetComponent,
    BarChartGadgetComponent,
    PieChartGadgetComponent
} from '@app/gadgets';
import {MenuEventService} from '@app/shell/menu/menu-service';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        CoreModule,
        SharedModule,
        GridModule.withComponents([
            MemoryGadgetComponent,
            CPUGadgetComponent,
            ServiceListGadgetComponent,
            PropertyListGadgetComponent,
            DiskGadgetComponent,
            StatisticGadgetComponent,
            TrendGadgetComponent,
            NewsGadgetComponent,
            JobAnalysisGadgetComponent,
            TrendLineGadgetComponent,
            EdgeServiceListGadgetComponent,
            CPUMGadgetComponent,
            StorageObjectListComponent,
            DonutGadgetComponent,
            TodoGadgetComponent,
            BubbleGadgetComponent,
            BarChartGadgetComponent,
            PieChartGadgetComponent
        ]),
        ErrorHandlerModule,
        NgxChartsModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        GadgetSharedModule,
        BoardRoutingModule
    ],
    providers: [
        EndPointService,
        RuntimeService,
        ConfigurationService,
        GadgetPropertyService,
        ObservableWebSocketService,
        MenuEventService,
        OptionsService
    ],
    declarations: [
        BoardComponent
    ]
})
export class BoardModule {
}
