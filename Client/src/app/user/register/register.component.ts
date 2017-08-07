import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';


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
  createRegForm () {
    this.form = this.fb.group({
      name: name,
      email: email,
      password: password
    })
  }
  
  constructor(private fb: FormBuilder, private userService: UserService) { }

  
  ngOnInit() {
    this.createRegForm()
  }

  onSubmit(value: FormData){
    console.log(JSON.stringify(value))
    this.userService.Register(value).subscribe(
      data => {
        console.log(data);
      }
    )

    // let data = value.append("json", JSON.stringify(value));
  //   let data = JSON.stringify(value)
  //   fetch("https://gire.herokuapp.com/register",
  //   {
  //     method: "POST",
  //     body: data
  //   }
  // ).then(function(res){ return res.json(); })
  // .then(function(data){ alert( JSON.stringify( data ) ) })
    
  }

}
