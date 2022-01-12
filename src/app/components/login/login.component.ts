import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  flags: any = {};
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.flags.isLoggedInUser = (sessionStorage.getItem('isLoggedInUser')?.toLowerCase() === 'true');
    if (this.flags.isLoggedInUser) {
      this.router.navigate(['target']);
    } else {
      this.generateTargetForm();
    }
  }

  onClickForgotPassword() {
  }

  onClickLogin() {
    const emailId = this.loginForm.get('emailId')?.value;
    const password = this.loginForm.get('password')?.value;

    if (emailId === 'gmt@gmail.com' && password === 'gmt@gmail.com') {
      sessionStorage.setItem('isLoggedInUser', 'true');
      location.reload();
    }
  }

  generateTargetForm() {
    this.loginForm = this.formBuilder.group({
      emailId: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  };
}
