import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from '../login/login-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public loginForm: FormGroup;
  public navigateTo: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }

  public async create() {
    let name = this.loginForm.value.name;
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.loginService.create(email, name, password).toPromise();
    this.router.navigate(['/login']);
  }
}
