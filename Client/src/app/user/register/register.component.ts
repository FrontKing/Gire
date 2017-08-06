import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';


const email = new FormControl('', Validators.compose([Validators.required, CustomValidators.email]));

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  // regForm: Form;
  createRegForm () {
    this.form = this.fb.group({
      email: email,
      name: name
    })
  }
  
  constructor(private fb: FormBuilder) { }

  
  ngOnInit() {
    this.createRegForm()
  }

  onSubmit(value){
    console.log(value)
  }

}
