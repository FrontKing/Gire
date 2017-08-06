import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


const email = new FormControl('', Validators.compose([Validators.required, CustomValidators.email]));

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

    public form: FormGroup;

  // regForm: Form;
  createRegForm () {
    this.form = this.fb.group({
      email: email
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
