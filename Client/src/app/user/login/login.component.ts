import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService, ToastOptions } from "ng2-toasty";

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
  loading: boolean = false;


  username: string;
  password: string;
  form: FormGroup;

  constructor(private _router: Router,
    // private route: ActivatedRoute,
    private _loadingService: TdLoadingService,
    private userService: UserService,
    private toastyService: ToastyService,
    private router: Router,
    private fb: FormBuilder) { }

  // regForm: Form;
  createLoginForm() {
    this.form = this.fb.group({
      email: email,
      password: password
    })
  }



  ngOnInit() {
    this.createLoginForm()
    // console.log(this.route.snapshot.params['email']);
  }

  onSubmit(value) {
    console.log(value)
    this.loading = true;
    this.userService.login(value).subscribe(
      data => {
        console.log(data)
        this.loading = false;
        if (data["status"]) {
          this.toastyService.success({
            title: "خوش آمدید 👋",
            msg: data["status"],
            theme: "default",
            showClose: true,
            timeout: 5000
          })
          this.userService._isLoggedIn = true;
          this.router.navigate(['/'])
        }
      },
      err => {
        console.error(err)
        this.loading = false;
        this.toastyService.error({
          title: "خطایی رخ داده",
          msg: "خطایی غیرمنتظره رخ داده است",
          theme: "default",
          showClose: true,
          timeout: 5000
        })
      })
  }

}


