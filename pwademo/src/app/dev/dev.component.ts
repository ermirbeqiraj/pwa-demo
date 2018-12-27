import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbContextService } from '../services/db-context.service';

declare var navigator: any;

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {
  items: any[] = [];
  connectionInfo: any;
  connectionApiSupport: boolean;

  constructor(private httpClient: HttpClient, private dbContext: DbContextService) { }

  ngOnInit() {
    this.getAll();
    this.connectionCheck();
  }

  connectionCheck() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection) {
      return;
    }
    this.connectionApiSupport = true;
    this.connectionInfo = connection;
  }

  getAll() {
    this.dbContext.getAll().then(response => {
      this.items = response;
    });
  }

  async delete(id: string) {
    await this.dbContext.delete(id);
    this.getAll();
  }

  retry(item: any) {
    const reqUrl = item.url;
    const reqMethod = item.method;
    const reqBodyObject = JSON.parse(item.body);
    switch (reqMethod) {
      case 'POST':
        this.syncPost(item.clientId, reqUrl, reqBodyObject);
        break;
      case 'PUT':
        this.syncPut(item.clientId, reqUrl, reqBodyObject);
        break;
      case 'DELETE':
        this.syncDelete(item.clientId, reqUrl);
        break;
      default:
        console.warn('CASE METHOD NOT SUPPORTED YET');
        break;
    }
  }

  syncPost(id: string, url: string, body: any) {
    this.httpClient.post(url, body).subscribe(res => {
      this.dbContext.delete(id).then(() => this.getAll());
    }, err => {
      console.log(err);
    });
  }

  syncPut(id: string, url: string, body: any) {
    this.httpClient.put(url, body).subscribe(res => {
      this.dbContext.delete(id).then(() => this.getAll());
    }, err => {
      console.log(err);
    });
  }

  syncDelete(id: string, url: string) {
    this.httpClient.delete(url).subscribe(res => {
      this.dbContext.delete(id).then(() => this.getAll());
    }, err => {
      console.log(err);
    });
  }
}
