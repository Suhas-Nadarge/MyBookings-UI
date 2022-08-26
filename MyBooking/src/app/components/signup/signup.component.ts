import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLogin: boolean = false;
  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private _userService: UserService,
    private toastr: ToastrManager,public validatorService: ValidatorService
    ) { }
  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+353-?)|0)?[0-9]{9}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get formValidator() {
    return this.loginForm.controls;
  }

  registerPartner() {
    this.router.navigate(['/partner-us'])
  }

  login() {
    let requestObj = this.loginForm.value;
    this._userService.loginUser(requestObj).subscribe({
      next: (v: { userId: string; name: string; }) => {
        if (v) {
          console.log(v)
          localStorage.setItem('id', v.userId)
          localStorage.setItem('name', v.name)
         
          // this._loginService.setCustomer(true);
          this.toastr.successToastr('Logged in successfully!', 'Success');
          this.isLogin = true;
          this.router.navigate(['/home'])
        } else {
          this.toastr.errorToastr('Please enter valid credentials.')
        }
        console.log(v);
      }, error: (err: any) => {
        (err: any) => {
          this.toastr.errorToastr(err['error']['message'] ? err['error']['message'] : 'Please enter valid credentials!', 'Error');
        }
      }
    });
  }

  partnerLogin(requestObj: any) {
    
  }

  

  registerUser(): any {
    // this.loginForm.controls["role"].setValue("Customer")
    let isInvalid = false;
    Object.keys(this.loginForm.controls).forEach(element => {
      if (this.loginForm.controls[element].value === '') {
        this.toastr.errorToastr(element.toUpperCase() + ' is required', 'Error')
        isInvalid = true;
      }
    });

    if (!isInvalid) {
      let requestObj = this.loginForm?.value;
      // requestObj['pasword']= await .hash(requestObj, 10)

      this._userService.registerUser(requestObj)
        .subscribe({
          next: (v) => {
            this.toastr.successToastr('User Registered successfully, check your mail for the confirmation!', 'Success');
            this.loginForm.reset();
            this.isLogin = true;
            // window.location.reload();
          }
          , error: (err: { [x: string]: { [x: string]: any; }; }) => {
            {
              this.toastr.errorToastr(err['error']['message'] ? err['error']['message'] : 'Something went wrong!', 'Error');
              console.log(err['error']['message'])
            }
          }
        });
    }
  }

}
