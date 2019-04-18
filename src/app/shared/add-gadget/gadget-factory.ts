import {
    BarChartGadgetComponent,
    BubbleGadgetComponent,
    CPUGadgetComponent,
    CPUMGadgetComponent,
    DiskGadgetComponent,
    DonutGadgetComponent, EdgeServiceListGadgetComponent,
    JobAnalysisGadgetComponent,
    MemoryGadgetComponent, NewsGadgetComponent,
    PieChartGadgetComponent,
    PropertyListGadgetComponent, ServiceListGadgetComponent, StatisticGadgetComponent, StorageObjectListComponent, TodoGadgetComponent, TrendGadgetComponent,
    TrendLineGadgetComponent
} from '@app/gadgets';

export class GadgetFactory {
    /**
     * todo - return new instances  instead of the same instance. This requires the creation of new configuration options.
     * @param gadgetType
     * @returns {any}
     */
    static getComponentType(gadgetType: string): any {
        switch (gadgetType) {
            case 'DonutGadgetComponent':
                return DonutGadgetComponent;
            case 'CPUGadgetComponent':
                return CPUGadgetComponent;
            case 'MemoryGadgetComponent':
                return MemoryGadgetComponent;
            case 'PropertyListGadgetComponent':
                return PropertyListGadgetComponent;
            case 'DiskGadgetComponent':
                return DiskGadgetComponent;
            case 'ServiceListGadgetComponent':
                return ServiceListGadgetComponent;
            case 'StatisticGadgetComponent':
                return StatisticGadgetComponent;
            case 'TrendGadgetComponent':
                return TrendGadgetComponent;
            case 'NewsGadgetComponent':
                return NewsGadgetComponent;
            case'JobAnalysisGadgetComponent':
                return JobAnalysisGadgetComponent;
            case'TrendLineGadgetComponent':
                return TrendLineGadgetComponent;
            case'EdgeServiceListGadgetComponent':
                return EdgeServiceListGadgetComponent;
            case 'CPUMGadgetComponent':
                return CPUMGadgetComponent;
            case 'StorageObjectListComponent':
                return StorageObjectListComponent;
            case 'TodoGadgetComponent':
                return TodoGadgetComponent;
            case 'BubbleGadgetComponent':
                return BubbleGadgetComponent;
            case 'BarChartGadgetComponent':
                return BarChartGadgetComponent;
            case 'PieChartGadgetComponent':
                return PieChartGadgetComponent;
            default:
                return null; // todo add default gadget that would be displayed. Useful for troubleshooting new gadget dev
        }
    }
}
