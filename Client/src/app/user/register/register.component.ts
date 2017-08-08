import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { ToastyService, ToastOptions } from "ng2-toasty";

const email = new FormControl('', Validators.compose([Validators.required, CustomValidators.email]));
const password = ' ';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  // regForm: Form;
  createRegForm() {
    this.form = this.fb.group({
      name: name,
      email: email,
      password: password
    })
  }

  constructor(private fb: FormBuilder, private userService: UserService, private toastyService: ToastyService) { }


  ngOnInit() {
    this.createRegForm()

    this.toastyService.wait(<ToastOptions>{
      title: "شکیبا باشید ...",
      msg: "در حال برقراری ارتباط با سرور",
      theme: "material",
      showClose: true,
      timeout: 5000
    });
  }

  onSubmit(value) {
    console.log(JSON.stringify(value))
    this.userService.register(value).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err)
    )
  }
}
