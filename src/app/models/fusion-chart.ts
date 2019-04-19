/*
 * Copyright (c) 2019. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import {ITag} from './Board';

export namespace ChartTypes {
    export enum SINGLE_SERIES {
        column2d = 'column2d',
        column3d = 'column3d',
        line = 'line',
        area2d = 'area2d',
        bar2d = 'bar2d',
        bar3d = 'bar3d',
        pie2d = 'pie2d',
        pie3d = 'pie3d',
        doughnut2d = 'doughnut2d',
        doughnut3d = 'doughnut3d',
        pareto2d = 'pareto2d',
        pareto3d = 'pareto3d'
    }

    export enum MULTI_SERIES {
        mscolumn2d = 'mscolumn2d',
        mscolumn3d = 'mscolumn3d',
        msline = 'msline',
        msbar2d = 'msbar2d',
        msbar3d = 'msbar3d',
        overlappedcolumn2d = 'overlappedcolumn2d',
        overlappedbar2d = 'overlappedbar2d',
        msarea = 'msarea',
        marimekko = 'marimekko',
        zoomline = 'zoomline',
        zoomlinedy = 'zoomlinedy'
    }

    export enum STACKED {
        stackedcolumn2d = 'stackedcolumn2d',
        stackedcolumn3d = 'stackedcolumn3d',
        stackedbar2d = 'stackedbar2d',
        stackedbar3d = 'stackedbar3d',
        stackedarea2d = 'stackedarea2d',
        msstackedcolumn2d = 'msstackedcolumn2d'
    }

    export enum COMBINATION {
        mscombi2d = 'mscombi2d',
        mscombi3d = 'mscombi3d',
        mscolumnline3d = 'mscolumnline3d',
        stackedcolumn2dline = 'stackedcolumn2dline',
        stackedcolumn3dline = 'stackedcolumn3dline',
        mscombidy2d = 'mscombidy2d',
        mscolumn3dlinedy = 'mscolumn3dlinedy',
        stackedcolumn3dlinedy = 'stackedcolumn3dlinedy',
        msstackedcolumn2dlinedy = 'msstackedcolumn2dlinedy'
    }

    export enum XY_PLOT {
        scatter = 'scatter',
        zoomscatter = 'zoomscatter',
        bubble = 'bubble'
    }

    export enum SCROLL {
        scrollcolumn2d = 'scrollcolumn2d',
        scrollline2d = 'scrollline2d',
        scrollarea2d = 'scrollarea2d',
        scrollstackedcolumn2d = 'scrollstackedcolumn2d',
        scrollcombi2d = 'scrollcombi2d',
        scrollcombidy2d = 'scrollcombidy2d'
    }
}

export interface IDataset {
    data: IData[];
    color?: string;
    seriesname?: string;
    lowerboxcolor?: string;
    upperboxcolor?: string;
    valuePosition?: string;
    allowDrag?: string;
}

export interface IData {
    label?: string;
    value?: string;
    name?: string;
    x?: string;
    y?: string;
    z?: string;
    open?: string;
    high?: string;
    low?: string;
    close?: string;
    volume?: string;
    dashed?: string;
    allowDrag?: string;
    tooltext?: string;
}

export interface ICategories {
    category: ICategory[];
}

export interface ITrendline {
    line: ILine[];
}

export interface IVTrendline {
    line: ILine[];
}

export interface ICategory {
    label: string;
    x?: string;
    showverticalline?: string;
}

export interface ILine {
    startValue?: string;
    endValue?: string;
    isTrendZone?: string;
    color?: string;
    alpha?: string;
    valueOnRight?: string;
    displayvalue?: string;
    thickness?: string;
    dashed?: string;
    displayValue?: string;
}

export class Chart {
    caption?: string;
    subCaption?: string;

    numberPrefix?: string;
    sNumberPrefix?: string;
    numberSuffix?: string;
    sNumberSuffix?: string;
    vNumberPrefix?: string;

    showLegend?: boolean;
    xAxisName?: string;
    yAxisName?: string;

    pYAxisName?: string;
    sYAxisName?: string;

    xAxisMinValue?: string;
    xAxisMaxValue?: string;
    yAxisMinValue?: string;
    yAxisMaxValue?: string;

    theme?: string;

    constructor(chart?: Chart, ...others: any) {
        this.theme = 'fusion';
        Object.assign(this, chart);
        Object.assign(this, others);
    }
}

export class FusionChart {
    chart: Chart = new Chart();
    data?: IData[];
    categories?: ICategories[] = [];
    dataset?: IDataset[] = [];
    trendlines?: ITrendline[];
    vTrendlines?: IVTrendline[];
    tags?: ITag;
    alias?: string;

    constructor(chart?: Chart, ...others: any) {
        Object.assign(this.chart, chart);
        // Object.assign(this, others);
    }
}

export namespace ChartDatasource {
    export class SingleSeries extends FusionChart {
        constructor(chart: Chart, data?: IData[], ...others: any) {
            super(chart, others);
            this.data = [];
            Object.assign(this.data, data || null);
            // Object.assign(this, others);
        }
    }

    export class MultiSeries extends FusionChart {
        constructor(chart: Chart, categories?: ICategories[], dataset?: IDataset[], ...others: any) {
            super(chart, others);
            Object.assign(this.categories, categories);
            Object.assign(this.dataset, dataset);
            // Object.assign(this, others);
        }
    }
}

export class Column2D extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.column2d;

    constructor(chart: Chart, data?: IData[], trendlines?: ITrendline[]) {
        super(chart, data);
        Object.assign(this.trendlines, trendlines);
    }
}

export class Column3D extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.column3d;

    constructor(chart: Chart, data?: IData[]) {
        super(chart, data);
    }
}

export class Line extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.line;

    constructor(chart: Chart, data?: IData[]) {
        super(chart, data);
    }
}

export class Area2D extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.area2d;

    constructor(chart: Chart, data?: IData[]) {
        super(chart, data);
    }
}

export class Bar2D extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.bar2d;

    constructor(chart: Chart, data?: IData[]) {
        super(chart, data);
    }
}

export class Bar3D extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.bar3d;

    constructor(chart: Chart, data?: IData[]) {
        super(chart, data);
    }
}

export class Pie2D extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.pie2d;

    constructor(chart: Chart, data?: IData[]) {
        super(chart, data);
    }
}

export class Pie3D extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.pie3d;

    constructor(chart: Chart, data?: IData[]) {
        super(chart, data);
    }
}

export class Doughnut2D extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.doughnut2d;

    constructor(chart: Chart, data?: IData[]) {
        super(chart, data);
    }
}

export class Doughnut3D extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.doughnut3d;

    constructor(chart: Chart, data?: IData[]) {
        super(chart, data);
    }
}

export class Pareto2D extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.pareto2d;

    constructor(chart: Chart, data?: IData[]) {
        super(chart, data);
    }
}

export class Pareto3D extends ChartDatasource.SingleSeries {
    alias = ChartTypes.SINGLE_SERIES.pareto3d;

    constructor(chart: Chart, data?: IData[]) {
        super(chart, data);
    }
}

export class Bubble extends FusionChart {
    alias = 'bubble';

    constructor(chart: Chart, categories?: ICategories[], dataset?: IDataset[]) {
        super(chart);
        Object.assign(this.categories, categories);
        Object.assign(this.dataset, dataset);
    }
}

export class Dragarea extends FusionChart {
    alias = 'dragarea';

    constructor(chart: Chart, categories?: ICategories[], dataset?: IDataset[]) {
        super(chart);
        Object.assign(this.categories, categories);
        Object.assign(this.dataset, dataset);
    }
}

