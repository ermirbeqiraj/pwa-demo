import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  people: Person[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getall().subscribe(response => {
      this.people = response;
    });
  }
}
