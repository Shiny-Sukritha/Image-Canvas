import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent  implements OnInit {

  public images: Array<any> = [];

  constructor(
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.getDatabase();
    })
  }

  public getDatabase(){
    const request = indexedDB.open('myDatabase', 1);

    request.onupgradeneeded = function(event: any) {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('myObjectStore')) {
        db.createObjectStore('myObjectStore', { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      this.getImages(db);      
    };
  }

  public getImages(db: IDBDatabase) {
    const transaction = db.transaction('myObjectStore', 'readonly');
    const store = transaction.objectStore('myObjectStore');
    const request = store.getAll();

    request.onsuccess = (event: any) => { 
      event.target.result;
      event.target.result.forEach((img: any) => {
        this.images.push(img)        
      })
      return event.target.result;
    };

    request.onerror = (event: any) => {
    }
  }

}
