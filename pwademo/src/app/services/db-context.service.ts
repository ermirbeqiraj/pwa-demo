import { Injectable } from '@angular/core';
import idb from 'idb';

@Injectable({
  providedIn: 'root'
})
export class DbContextService {
  dbName = 'pwademo-indexed-db';
  dbTableName = 'failedRequests';
  dbVersion = 1;
  constructor() {
    if (!('indexedDB' in window)) {
      throw new Error('This browser doesn\'t support IndexedDB');
    }
  }

  getId() {
    // creating a genuine GUID in javascript is kind of a bizarre thing,
    // I'm using a simple timestamp for this demo.
    return new Date().getTime();
  }

  idbContext() {
    return idb.open(this.dbName, this.dbVersion, upgradeDb => {
      switch (upgradeDb.oldVersion) {
        case 0:
          upgradeDb.createObjectStore(this.dbTableName, { keyPath: 'clientId' });
      }
    });
  }

  saveRequest(url: string, method: string, body: any) {
    // in case the sync method fails, this method will be
    // invoked again. to prevent duplications of the very same object in localDb,
    // we add a custom property (clientId), and simply return before save
    if (body.hasOwnProperty('clientId')) {
      console.log('this item is already in indexedDb');
      return;
    }

    if (body.hasOwnProperty('description')) {
      body['description'] = `${body['description']} (auto-sync)`;
    }

    const customId = this.getId();
    body.clientId = customId;

    const obj = {
      clientId: customId,
      url: url,
      method: method,
      body: JSON.stringify(body)
    };

    this.idbContext().then(db => {
      const tx = db.transaction(this.dbTableName, 'readwrite');
      tx.objectStore(this.dbTableName).add(obj);
      return tx.complete;
    });
  }

  async getAll() {
    const db = await this.idbContext();
    return db.transaction(this.dbTableName, 'readonly').objectStore(this.dbTableName).getAll();
  }

  async delete(clientId: string) {
    const db = await this.idbContext();
    const tx = db.transaction(this.dbTableName, 'readwrite');
    tx.objectStore(this.dbTableName).delete(clientId);
    return tx.complete;
  }
}
