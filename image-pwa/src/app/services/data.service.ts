import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
  }

  ngAfterViewInit(){}

  public initializeDatabase() {
    const request = indexedDB.open('imagesDatabase', 1);

    request.onupgradeneeded = function(event: any) {
      const db = event.target.result;      
      if (!db.objectStoreNames.contains('myObjectStore')) {
        db.createObjectStore('myObjectStore', { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result;      
    };

    request.onerror = function(event: any) {
    };
  }

  public addImage(url: string, height: number, width: number, db: IDBDatabase) {    
    let id = Math.floor((Math.random() * 1000 - 1 + 1) - 1);
    let data = {
      id: id,
      url: url,
      height: height ? height : 300,
      width: width ? width : 300
    }    
    const transaction = db.transaction('myObjectStore', 'readwrite');
    const store = transaction.objectStore('myObjectStore');
    const request = store.add(data);

    request.onsuccess = () => {
    };

    request.onerror = (event: any) => {
    };
  }

  public getImages(db: IDBDatabase) {
    const transaction = db.transaction('myObjectStore', 'readonly');
    const store = transaction.objectStore('myObjectStore');
    const request = store.getAll();

    request.onsuccess = (event: any) => {            
      return event.target.result;
    };

    request.onerror = (event: any) => {
    }
  }
}
