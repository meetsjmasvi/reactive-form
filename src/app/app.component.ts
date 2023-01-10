import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {
  forbiddenNameValidator,
  forbiddenNameCustomValidator,
} from './shared/forbiddenName.validator';
import { PasswordValidator } from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  registrationForm: FormGroup;
  title = 'reactive-form';

  get userName() {
    return this.registrationForm.get('username');
  }

  get ctrlEmail() {
    return this.registrationForm.get('email');
  }

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this._fb.group(
      {
        username: [
          'Mydeen',
          [
            Validators.required,
            Validators.minLength(3),
            forbiddenNameCustomValidator(/admin/),
          ],
        ],
        email: '',
        subscribe: false,
        password: [''],
        confirmPassword: [''],
        address: this._fb.group({
          city: [''],
          state: [''],
          postalCode: [''],
        }),
      },
      { validator: PasswordValidator }
    );

    this.registrationForm
      .get('subscribe')
      .valueChanges.subscribe((checkedValue) => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }

        email.updateValueAndValidity();
      });
  }

  loadAPIData() {
    this.registrationForm.patchValue({
      username: 'Mydeen',
      password: 'password',
      confirmPassword: 'password',
    });
  }
}

// COMMENTED OUT TO TEST THE SAME WITH FORMBUILDER APPROACH
// export class AppComponent {
//   title = 'reactive-form';

//   registrationForm = new FormGroup({
//     username: new FormControl('Mydeen'),
//     password: new FormControl(''),
//     confirmPassword: new FormControl(''),
//     address: new FormGroup({
//       city: new FormControl(''),
//       state: new FormControl(''),
//       postalCode: new FormControl(''),
//     }),
//   });

//   loadAPIData() {
//     this.registrationForm.patchValue({
//       username: 'Mydeen',
//       password: 'password',
//       confirmPassword: 'password',
//     });
//   }
// }
