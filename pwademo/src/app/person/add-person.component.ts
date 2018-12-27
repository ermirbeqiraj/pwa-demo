import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Person } from '../models/person';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit({ valid, value }: { valid: boolean, value: Person }) {
    if (!valid) {
      alert('Complete the fields');
      return;
    }
    this.dataService.create(value).subscribe(() => console.log('done...'),
     (error) => {
      console.log(error);
      }, () => {
        this.router.navigate(['/']);
      });
  }
}
