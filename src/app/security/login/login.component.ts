import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from './login-service.service';
import { User } from './user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public navigateTo: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  public login() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.loginService.login(email, password).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user)),
        setTimeout(() => {
          localStorage.setItem('user', null);
          this.loginService.isLoggedIn();
        }, 3600000),
        response => console.log(response),
        this.router.navigate([atob(this.navigateTo)]);
    });
  }

  public navigate() {
    this.router.navigate(['/registration']);
  }
}
