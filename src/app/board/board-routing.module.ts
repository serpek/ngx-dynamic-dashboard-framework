import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import {BoardComponent} from '@app/board/board.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/board', pathMatch: 'full' },
    { path: 'board', component: BoardComponent, data: { title: extract('Board') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BoardRoutingModule { }

