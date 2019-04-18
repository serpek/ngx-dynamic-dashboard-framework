import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Facet} from './facet-model';

@Component({
    moduleId: module.id,
    selector: 'app-filter-list',
    template: `
        <br>
        <div *ngFor='let facet of facet_tags ;let i = index'>
            <app-facet [facet]='facet' (tagSelectEvent)='tagSelect($event)' [openFacet]='i < 2'></app-facet>
        </div>
    `,
    styleUrls: ['./styles.css']
})
export class FilterListComponent {
    @Output() tagSelectEvent: EventEmitter<any> = new EventEmitter();
    @Input() facet_tags: Array<Facet>;

    tagSelect(tagName: any) {
        this.tagSelectEvent.emit(tagName);
    }
}
