import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { ToastyService, ToastOptions } from "ng2-toasty";

const email = new FormControl(' ', Validators.compose([Validators.required, CustomValidators.email]));
const password = ' ';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;
  // regForm: Form;
  createRegForm() {
    this.form = this.fb.group({
      name: name,
      email: email,
      password: password
    })
  }

  constructor(private fb: FormBuilder, private userService: UserService,
    private toastyService: ToastyService
    , private router: Router) { }


  ngOnInit() {

    this.createRegForm()

  }

  onSubmit(value) {
    this.loading = true;
    this.userService.register(value).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        if (data["status"] == "success") {
          let msg = data["data"];

          console.log(msg);

          this.toastyService.success({
            title: "ثبت نام انجام شد",
            msg: msg[0].message,
            theme: "default",
            showClose: true,
            timeout: 5000
          })
          this.router.navigate(['/login'])
        } else if (data["status"] == "error") {
          this.toastyService.warning({
            title: "مجدد تلاش کنید!",
            msg: data["data"],
            theme: "default",
            showClose: true,
            timeout: 5000
          })
        }
      },
      err => {
        console.error(err => err.json())
        this.loading = false;
        this.toastyService.error({
          title: "خطایی رخ داده",
          msg: "خطایی غیرمنتظره رخ داده است",
          theme: "default",
          showClose: true,
          timeout: 5000
        })
      }
    )
  }
}
