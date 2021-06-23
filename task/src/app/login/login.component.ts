import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  visiblePassword: boolean = false;
  form: FormGroup;

  activeUser: boolean = false;
  activePass: boolean = false;

  auth: DataService;

  constructor(private router: Router, auth:DataService) {
    this.auth = auth;
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(?!.)/),]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  togglePass(): void {
    this.visiblePassword = !this.visiblePassword;

  }

  submit(): void {
    this.router.navigate(['main']);
  }
}


