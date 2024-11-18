import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanvasPage } from './canvas.page';
import { ImageCaptureComponent } from './image-capture/image-capture.component';

const routes: Routes = [
  {
    path: '',
    component: CanvasPage,
    children: [
      {
        path: '',
        component: ImageCaptureComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanvasPageRoutingModule {}
