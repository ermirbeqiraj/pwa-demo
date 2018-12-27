import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Person } from '../models/person';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  public form: FormGroup;
  personId: number;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.personId = params['id'] as number;
      this.getPerson(this.personId);
    });
  }

  getPerson(id: number) {
    this.dataService.get(id).subscribe(response => {
      this.form.patchValue({
        id: response.id,
        name: response.name,
        phoneNumber: response.phoneNumber,
        address: response.address
      });
    }, (err: any) => {
      console.log(err);
      console.log('component data failed to retrieve');
    }, () => {
      console.log('component data request completed');
    });
  }
  onSubmit({ valid, value }: { valid: boolean, value: Person }) {
    this.dataService.editPerson(this.personId, value).subscribe(response => { console.log('done...'); },
      (error) => {
        console.log(error);
      },
      () => {
        this.router.navigate(['/']);
      });
  }
}
