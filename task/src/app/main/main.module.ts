import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './components/card/card.component';
import {TableComponent} from './components/table/table.component';
import {RouterModule, Routes} from '@angular/router';
import {CardChildComponent} from './components/card-child/card-child.component';
import {MainComponent} from './main.component';
import {CircleSvgComponent} from './components/circle-svg/circle-svg.component';


export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'chart',
      },
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'chart',
        component: CircleSvgComponent
      },
    ]
  },
];

@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    CardChildComponent,
    MainComponent,
    CircleSvgComponent
  ],
  exports: [
    CardComponent,
    TableComponent,
    CardChildComponent,
    CircleSvgComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),
  ],
})
export class MainModule {
}
