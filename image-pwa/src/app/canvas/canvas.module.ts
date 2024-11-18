import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanvasPageRoutingModule } from './canvas-routing.module';

import { CanvasPage } from './canvas.page';
import { ImageCaptureComponent } from './image-capture/image-capture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanvasPageRoutingModule
  ],
  declarations: [CanvasPage,ImageCaptureComponent]
})
export class CanvasPageModule {}
