import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TdLoadingService } from '@covalent/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


const email = new FormControl('', Validators.compose([Validators.required, CustomValidators.email]));
const password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));

@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  username: string;
  password: string;
  form: FormGroup;

  constructor(private _router: Router,
              private _loadingService: TdLoadingService, private fb: FormBuilder) {}

  // regForm: Form;
  createLoginForm () {
    this.form = this.fb.group({
      email: email,
      password: password
    })
  }
  

  
  ngOnInit() {
    this.createLoginForm()
  }

  onSubmit(value){
    console.log(value)
  }
d
}


