import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagesPage } from './images.page';
import { ImageListComponent } from './image-list/image-list.component';

const routes: Routes = [
  {
    path: '',
    component: ImagesPage,
    children: [
      {
        path: '',
        component: ImageListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagesPageRoutingModule {}
