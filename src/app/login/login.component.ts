import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

export function ValidatePasswords(control: AbstractControl) {
  if (control.value === '') {
    return { validUrl: true };
  }
  return null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  isNewMember = false;
  isWriting = false;

  // Spinner settings
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;

  /*-- Using this form group to reset controls after submit --*/
  registerFormGroup: FormGroup;

  /*-- All controls used in form --*/
  nameControl = new FormControl('', Validators.required);
  lastNameControl = new FormControl('', Validators.required);
  idControl = new FormControl('', Validators.required);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  usernameControl = new FormControl('', Validators.required);
  passwordControl = new FormControl('', Validators.required);
  confPassControl = new FormControl('', Validators.required);

  constructor(private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerFormGroup = this._formBuilder.group({
      name: this.nameControl,
      lastName: this.lastNameControl,
      id: this.idControl,
      email: this.emailControl,
      username: this.usernameControl,
      password: this.passwordControl,
      confPass: this.confPassControl
    });
  }

  login() {
    this.router.navigate(['/home']);
  }

  register() {
    const data = {
      name: this.nameControl.value,
      lastName: this.lastNameControl.value,
      email: this.emailControl.value,
      id: this.idControl.value,
      username: this.usernameControl.value,
      password: this.passwordControl.value
    };
    this.displayProgressSpinner = true;
    setTimeout(() => {
      this.displayProgressSpinner = false;
      console.log('User data:', data);
      this.registerFormGroup.reset();
      this.goBack();
    }, 3000);
  }

  openSignUp() {
    this.isNewMember = true;
  }

  goBack() {
    this.isNewMember = false;
    this.registerFormGroup.reset();
  }

  comparePasswords() {
    if (this.confPassControl.value !== '') {
      if (this.passwordControl.value === this.confPassControl.value) {
        this.confPassControl.setErrors(null);
      } else {
        this.confPassControl.setErrors({ invalid: true });
      }
    }
  }

  getEmailErrorMessage() {
    return this.emailControl.hasError('required') ? 'Porfavor ingresa un correo' :
      this.emailControl.hasError('email') ? 'Email invalido' :
        '';
  }

}

