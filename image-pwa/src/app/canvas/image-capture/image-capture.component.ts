import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.scss'],
})
export class ImageCaptureComponent  implements OnInit {

  public isCameraOn: boolean = false;
  public imageCaptured: boolean = false;
  public videoStream: MediaStream | null = null;
  public imageUrl: string = '';
  public height: any;
  public width: any;

  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(
    private router: Router,
    private dataService: DataService,
    private loading: LoadingController
  ) { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.dataService.initializeDatabase();
  }

  public openCamera() {
    this.isCameraOn = true;
    this.imageCaptured = false;
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.videoStream = stream;
      this.videoElement.nativeElement.srcObject = stream;
    }).catch((error) => {
      console.error('Error accessing camera:', error);
    });
  }

  public captureImage() {
    this.isCameraOn = false;
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      this.imageUrl = this.canvasElement.nativeElement.toDataURL('image/jpeg');      
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing camera: ", error);
        });
    }
    this.isCameraOn = false;
    this.imageCaptured = true;
  }

  public exportImage(){
    const request = indexedDB.open('myDatabase', 1);

    request.onupgradeneeded = function(event: any) {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('myObjectStore')) {
        db.createObjectStore('myObjectStore', { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      this.dataService.addImage(this.imageUrl, this.height, this.width, db);
      this.redirectToImages();
    };
  }

  public async redirectToImages(){
    const loading = await this.loading.create({message: "Redirecting after 2 seconds"});
    loading.present();  
    setTimeout(() => {  
      loading.dismiss();     
      this.router.navigate(['/images']);
    },2000)  
  }
}
