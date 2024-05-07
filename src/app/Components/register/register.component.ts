import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterAPIService } from '../../Services/register-api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isPanar: boolean = false;
  constructor(private _RegisterAPIService: RegisterAPIService,
    private _Router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{3,}$/)
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{3,}$/)
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/)
      ])
    });
  }
  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
  handelSubmit(register: FormGroup) {
    this.isPanar = true;
    this.spinner.show();
    if (register.valid) {
      console.log("--------register is valid-------------")
      console.log(register.value)
      this._RegisterAPIService.Register(register.value).subscribe({
        next: (respons) => {
          this.spinner.hide();
          this.isPanar = false;
          console.log("-----------respons-------------")
          console.log(respons)
          this._Router.navigate(['/login'])
        },
        error: (err) => {
          this.spinner.hide();
          this.isPanar = false;
        }
      })
    } else {
      register.markAllAsTouched();
    }
  }
}
