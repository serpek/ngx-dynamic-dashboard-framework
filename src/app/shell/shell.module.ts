import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

import {ShellComponent} from './shell.component';
import {BoardModule} from '@app/board/board.module';
import {MenuModule} from '@app/shell/menu/menu.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        MenuModule,
        BoardModule
    ],
    declarations: [
        ShellComponent
    ]
})
export class ShellModule {
}
