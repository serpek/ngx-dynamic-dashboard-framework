import {NgModule, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GridsterModule} from 'angular-gridster2';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';

import {GridComponent} from './grid.component';
import {CellComponent} from './cell.component';
import {GadgetInstanceService} from './grid.service';
import {ConfigurationService} from '../services/configuration.service';
import {SharedModule} from '@app/shared';
import {NewsService} from '@app/gadgets/news/service';
import {DonutService} from '@app/gadgets/donut/service';
import {PieChartService} from '@app/gadgets/piechart/service';
import {JobAnalysisService} from '@app/gadgets/job-analysis/service';
import {TodoService} from '@app/gadgets/todo/service';
import {CPUService} from '@app/gadgets/cpu/service';
import {BarChartService} from '@app/gadgets/barchart/service';
import {TrendLineService} from '@app/gadgets/trend-line/service';
import {EdgeService} from '@app/gadgets/edge-service-list/service';
import {BubbleService} from '@app/gadgets/bubble/service';
import {TrendService} from '@app/gadgets/trend/service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        HttpClientModule,
        GridsterModule
    ],
    declarations: [
        GridComponent,
        CellComponent
    ],
    exports: [
        GridComponent
    ],
    providers: [
        GadgetInstanceService,
        ConfigurationService,
        NewsService,
        JobAnalysisService,
        TrendLineService,
        TrendService,
        EdgeService,
        CPUService,
        DonutService,
        TodoService,
        BubbleService,
        BarChartService,
        PieChartService
    ]
})
export class GridModule {
    static withComponents(components: any[]) {
        return {
            ngModule: GridModule,
            providers: [
                {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
            ]
        };
    }
}
