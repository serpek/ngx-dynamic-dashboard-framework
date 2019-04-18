import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
    MatButtonModule, MatCheckboxModule, MatExpansionModule, MatIconModule, MatInputModule, MatOptionModule,
    MatProgressBarModule, MatSelectModule
} from '@angular/material';


import {CPUGadgetComponent} from './cpu/cpu-gadget.component';
import {CPUMGadgetComponent} from './cpum/cpum-gadget.component';
import {DiskGadgetComponent} from './disk/disk-gadget.component';
import {MemoryGadgetComponent} from './memory/memory-gadget.component';
import {EdgeServiceListGadgetComponent} from './edge-service-list/edge-service-list-gadget.component';
import {StatisticGadgetComponent} from './statistic/statistic-gadget.component';
import {TrendGadgetComponent} from './trend/trend-gadget.component';
import {TrendLineGadgetComponent} from './trend-line/trend-line-gadget.component';
import {NewsGadgetComponent} from './news/news-gadget.component';
import {TodoGadgetComponent} from './todo/todo-gadget.component';  // todo gadget
import {JobAnalysisGadgetComponent} from './job-analysis/job-analysis-gadget.component';
import {CPUService} from './cpu/service';
import {EdgeService} from './edge-service-list/service';
import {StatisticService} from './statistic/service';
import {DiskService} from './disk/service';
import {TrendService} from './trend/service';
import {PropertyListGadgetComponent} from './property-list/property-list-gadget.component';
import {ServiceListGadgetComponent} from './service-list/service-list-gadget.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GadgetSharedModule} from './_common/gadget-shared.module';
import {ErrorHandlerModule} from '../error/error.module';
import {FormsModule} from '@angular/forms';
import {StorageObjectListComponent} from './storage-object-list/storage-object-list.component';
import {StorageService} from './storage-object-list/service';
import {DonutGadgetComponent} from './donut/donut-gadget.component';
import {DonutService} from './donut/service';
import {DrillDownComponent} from './donut/drill-down-component';
import {TodoService} from './todo/service';
import {BubbleGadgetComponent} from './bubble/bubble-gadget.component';
import {BarChartGadgetComponent} from './barchart/barchart-gadget.component';
import {BarChartService} from './barchart/service';
import {PieChartGadgetComponent} from './piechart/piechart-gadget.component';
import {PieChartService} from './piechart/service';
import {SharedModule} from '@app/shared';
import {APITokenService} from '@app/services/api-token.service';  // todo gadget

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        GadgetSharedModule,
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
        FormsModule
    ],
    declarations: [
        TodoGadgetComponent,  // todo gadget
        CPUGadgetComponent,
        CPUMGadgetComponent,
        DiskGadgetComponent,
        MemoryGadgetComponent,
        EdgeServiceListGadgetComponent,
        StatisticGadgetComponent,
        TrendGadgetComponent,
        TrendLineGadgetComponent,
        NewsGadgetComponent,
        JobAnalysisGadgetComponent,
        StatisticGadgetComponent,
        PropertyListGadgetComponent,
        ServiceListGadgetComponent,
        StorageObjectListComponent,
        DonutGadgetComponent,
        DrillDownComponent,
        BubbleGadgetComponent,
        BarChartGadgetComponent,
        PieChartGadgetComponent
    ],

    providers: [TrendService,
        DiskService,
        StatisticService,
        EdgeService,
        CPUService,
        StorageService,
        DonutService,
        APITokenService,
        TodoService,  // todo gadget
        BarChartService,
        PieChartService
    ],
    exports: [
        TodoGadgetComponent,  // todo gadget
        CPUGadgetComponent,
        CPUMGadgetComponent,
        DiskGadgetComponent,
        MemoryGadgetComponent,
        EdgeServiceListGadgetComponent,
        StatisticGadgetComponent,
        TrendGadgetComponent,
        TrendLineGadgetComponent,
        NewsGadgetComponent,
        JobAnalysisGadgetComponent,
        StatisticGadgetComponent,
        PropertyListGadgetComponent,
        ServiceListGadgetComponent,
        StorageObjectListComponent,
        DonutGadgetComponent,
        BubbleGadgetComponent,
        BarChartGadgetComponent,
        PieChartGadgetComponent
    ]
})
export class GadgetModule {
}

